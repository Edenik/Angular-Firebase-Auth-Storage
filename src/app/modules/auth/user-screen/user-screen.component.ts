import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service'
import { FirebaseUserModel } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-user-screen',
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.scss']
})
export class UserScreenComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  photoURL: string | ArrayBuffer = '';
  selectedFile: File = null;


  constructor(
    public userService: UserService,
    public authService: AuthService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((routeData: FirebaseUserModel) => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.error(data);
        this.createForm(this.user.displayName);
      }
    })
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

  createForm(name: string) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this.isLoading = true;
    this.user.displayName = value.name;

    //Checks if user updated his profile image
    if (this.photoURL != '') {
      const filePath = `UsersImages/${this.user.uid}`;

      //Checks if the user image comes from storage
      if (this.user.photoURL.includes('UsersImages')) {
        this.deleteImage().then(res => {
          this.storageService.uploadImage(filePath, this.selectedFile).then(res => {
            this.user.photoURL = res;
            this.setUserData();
          }, err => { //upload error
            console.error(err);
          })
        }, err => { //delete error
          console.error(err);
        })

        //If the user image doesn't come from storage
      } else { 
        this.storageService.uploadImage(filePath, this.selectedFile).then(res => {
          this.user.photoURL = res;
          this.setUserData();

        }, err => { //upload error
          console.error(err);
        })
      }
    } else {
      this.setUserData();
      
    }




  }

  changeRole(role:string){
    this.user.role = role;
    this.setUserData();

  }

  setUserData(){
    this.userService.SetUserData(this.user).then(res => {
      this.isLoading = false;
      this.successMessage = 'User updated successfully';
      this.errorMessage = '';
      this.photoURL = '';
    }, err => {
      console.error(err);
      this.isLoading = false;
      this.errorMessage = 'Cannot update user.'
      this.successMessage = '';
      this.photoURL = '';
    }
    )
  }

  deleteImage() {
    return new Promise<any>((resolve, reject) => {
      this.storageService.deleteImage(this.user.photoURL).then(res => {
        console.error(res);
        resolve(res);
      }, err => {
        console.error(err);
        reject(err);
      })
    })
  }

  logout() {
    this.authService.doLogout()
      .then((res) => {
        // this.location.back();
        this.router.navigate(['/login']);

      }, (error) => {
        console.log("Logout error", error);
      });
  }
}