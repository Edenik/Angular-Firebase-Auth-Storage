import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { UserScreenComponent } from './user-screen/user-screen.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UserResolverService } from '../../core/resolvers/user-resolver.service';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'  },
  {path: 'profile' , component: UserScreenComponent ,  resolve: { data: UserResolverService} },
  {path: 'login' , component: LoginScreenComponent, canActivate: [AuthGuard]},
  {path: 'register' , component: RegisterScreenComponent, canActivate: [AuthGuard]},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }