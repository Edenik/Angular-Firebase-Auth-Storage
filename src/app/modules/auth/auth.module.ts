import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { UserResolverService } from 'src/app/core/resolvers/user-resolver.service';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


@NgModule({
  declarations: [LoginScreenComponent, RegisterScreenComponent, UserScreenComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, ReactiveFormsModule,

  ],
  providers : [AuthService, UserService, UserResolverService, AuthGuard]
})
export class AuthModule { }
