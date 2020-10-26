import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
    


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';

import * as firebase from 'firebase';
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    HomeModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule

  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
