import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.isLoading = true;
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['/profile']);
      }, err => {
        this.isLoading = false;
      })
  }

  tryTwitterLogin() {
    this.isLoading = true;

    this.authService.doTwitterLogin()
      .then(res => {
        this.router.navigate(['/profile']);
      }, err => {
        this.isLoading = false;
      })
  }

  tryGoogleLogin() {
    this.isLoading = true;

    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/profile']);
      }, err => {
        this.isLoading = false;
      })
  }

  tryLogin(value) {
    this.isLoading = true;
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/profile']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }


  ngOnInit(): void {
  }

}
