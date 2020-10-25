import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginScreenComponent, RegisterScreenComponent, UserScreenComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
