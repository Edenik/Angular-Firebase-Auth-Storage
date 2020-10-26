import { Injectable, NgZone } from '@angular/core';
// import { User } from "../services/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth){}

  doFacebookLogin(){
    return new Promise<any>((resolve,reject) => {
      let provider = new auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res); 
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise<any>((resolve,reject) => {
      let provider = new auth.TwitterAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res); 
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve,reject) => {
      let provider = new auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(provider).then(res => {
        resolve(res); 
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doRegister(value){
    return new Promise<any>((resolve,reject) => {
      auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }


  doLogout(){
    return new Promise((resolve, reject) => {
      if(auth().currentUser){
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    } )
  }

}
