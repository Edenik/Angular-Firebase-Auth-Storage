import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { FirebaseUserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(
    public db: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ){}
 
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  
  isLoggedIn() {
    return this.afAuth.authState.pipe().toPromise();
 }
 

 
   SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const userData: FirebaseUserModel = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      provider: user.provider
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  
   updateCurrentUser(value){
     return new Promise<any>((resolve, reject) => {
       var user = firebase.auth().currentUser;
       user.updateProfile({
         displayName: value.name,
         photoURL: user.photoURL
       }).then(res => {
         resolve(res);
       }, err => reject(err))
     })
   }
 }
 