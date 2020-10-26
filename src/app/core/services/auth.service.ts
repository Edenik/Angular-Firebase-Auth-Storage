import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from './user.service';
import { FirebaseUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private userService: UserService) { }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.TwitterAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {

        this.saveUserOnDB(res).then(_ => {
          resolve(res);
        }, err => {
          reject(err);
        })

      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }



  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }


  doLogout() {
    return new Promise((resolve, reject) => {
      if (auth().currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    })
  }

  saveUserOnDB(res) {
    return new Promise<any>((resolve, reject) => {

      //checks if user has doc on db
      this.userService.getUserFromDB(res.user.uid).then(doc => {
        if (doc) {
          console.error(doc);
          resolve(doc);

        }
        else {
          let user = new FirebaseUserModel();
          user = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL,
            provider: res.user.providerData[0].providerId
          }

          this.userService.SetUserData(user).then(_ => {
            resolve(res);

          }, err => {
            console.log(err);
            reject(err);
          })
        }
      }, err => {
        reject(err);

        console.error(err);
      })


    })

  }

}
