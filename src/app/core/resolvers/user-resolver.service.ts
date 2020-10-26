  
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { FirebaseUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }
  user: FirebaseUserModel = new FirebaseUserModel();

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {

        this.userService.getUserFromDB(res.uid).then(userFromDB => {
          this.user = { 
            uid: userFromDB.uid, 
            email: userFromDB.email, 
            displayName: userFromDB.displayName, 
            photoURL: userFromDB.photoURL, 
            provider: userFromDB.provider 
          };

          return resolve(this.user);

        }, error => { // get user error
          console.error(error);
          
        })
      }, err => { // no user loged in
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}