import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service'
import { FirebaseUserModel } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, Params } from '@angular/router';

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


  constructor(
    public userService: UserService,
    public authService: AuthService,
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

  createForm(name: string) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this.isLoading = true;
    console.error(value.name)

    this.user.displayName = value.name;

    this.userService.SetUserData(this.user).then(res => {
      this.isLoading = false;
      this.successMessage = 'User updated successfully';
      this.errorMessage = '';
    }, err => {
      console.error(err);
      this.errorMessage = 'Cannot update user.'
      this.successMessage = '';
    }
    )

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