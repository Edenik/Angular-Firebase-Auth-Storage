import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { UserScreenComponent } from './user-screen/user-screen.component';


const routes: Routes = [
  {path: '' , component:UserScreenComponent  },
  {path: 'profile' , component: UserScreenComponent},
  {path: 'login' , component: LoginScreenComponent},
  {path: 'register' , component: RegisterScreenComponent},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }