  
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { FirebaseUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        console.error(res);
        if(res.providerData[0].providerId == 'password'){
          user.photoURL = 'https://via.placeholder.com/400x300';
          user.displayName = res.displayName;
          user.provider = res.providerData[0].providerId;
          console.log(user)
          return resolve(user);
        }
        else{
          user.photoURL = res.photoURL  || "";
          user.displayName = res.displayName ;
          user.provider = res.providerData[0].providerId;
          console.log(user)

          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}