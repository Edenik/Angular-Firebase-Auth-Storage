import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: AngularFireStorage
  ) {}

  downloadURL: Observable<string>;

  deleteImage(downloadURL:string){
    return new Promise<any>((resolve, reject) => {
      this.storage.storage.refFromURL(downloadURL).delete().then(res => {
        resolve(res);
      }, err =>{
        reject(err);
      })
    })
  }


  uploadImage(filePath: string, selectedFile: File) {
    return new Promise<any>((resolve, reject) => {
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, selectedFile);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(url => {
              if (url) {
                console.log(url);
                resolve(url);
              }
              else {
                reject(url);
              }
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
    })


  }

}
