import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service'
import { StorageService } from '../../../core/services/storage.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { FirebaseUserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.scss']
})
export class RegisterScreenComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  photoURL: string | ArrayBuffer = '';
  selectedFile: File = null;
  isLoading: boolean = false;


  constructor(
    public authService: AuthService,
    private storageService: StorageService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }



  createForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      photoURL: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.selectedFile = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.photoURL = event.target.result;
      }
    }
  }



  tryRegister(value) {
    if (value.email && value.password && value.photoURL && value.username) {
      this.isLoading = true;

      //Register
      this.authService.doRegister(value)
        .then(res => {
          const user = res.user;
          const filePath = `UsersImages/${user.uid}`;

          //Upload Photo
          this.storageService.uploadProfileImage(filePath, this.selectedFile).then(uploadedPhotoURL => {
            console.error(uploadedPhotoURL);
            const userData: FirebaseUserModel = {
              uid: user.uid,
              email: value.email,
              displayName: value.username,
              photoURL: uploadedPhotoURL,
              provider: user.providerData[0].providerId
            }

            //Set user data on database
            this.userService.SetUserData(userData).then(
              res => {
                this.errorMessage = "";
                this.successMessage = "Your account has been created";
                this.isLoading = false;
                this.router.navigate(['/profile']);


              }, err => { //Set user data error
                this.errorMessage = err.message;
                this.successMessage = "";
                this.isLoading = false;
              }
            )
          }, err => { // Upload Error
            this.errorMessage = err.message;
            this.successMessage = "";
            this.isLoading = false;
          });


        }, err => { // Register Error
          this.errorMessage = err.message;
          this.successMessage = "";
          this.isLoading = false;
        })
    }
    else {
      this.errorMessage = "Please fill all the inputs!"
      this.isLoading = false;
    }

  }


  ngOnInit(): void {
  }

}
