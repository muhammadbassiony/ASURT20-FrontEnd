import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {Photoroll} from "./photoroll.model";

@Injectable({ providedIn: 'root' })
export class PhotorollService {
   private photoroll: Photoroll

   photorollUpdated = new Subject<Photoroll>();

  constructor(private http: HttpClient, private router: Router) {

  }



  getPhotos() {
    this.http
      .get<{ message: string; imagePaths: string[] }>("http://localhost:3000/api/photo-roll")
      // .pipe(
        // map(photoData => {
        //   return photoData.photos.map(photoroll => {
        //     return {
        //       imagePaths: photoroll.imagePaths,
        //       noPhotos: photoroll.imagePaths.length
        //     };
        //   });
        // })).subscribe(transformedPhotos => {
      .subscribe(imagePaths => {
          this.photoroll.imagePaths = imagePaths.imagePaths;
          this.photoroll.noPhotos = imagePaths.imagePaths.length;
          this.photorollUpdated.next(this.photoroll);
        });
  }

  addPhotoroll(activeImage: File, otherImages: File[]) {
    const photoroll  = new FormData();
    photoroll.append("activeImage", activeImage);
    for (let i = 0 ; i< otherImages.length;i++) {
      photoroll.append("otherImages", otherImages[i]);
    }
    //console.log(photoroll); //form data
    console.log(activeImage);
    console.log(otherImages); //image selected on other images
    this.http
      .post<{ message: string; photoroll: Photoroll }>(
        "http://localhost:3000/api/photo-roll",
        photoroll
      )
      .subscribe(responseData => {
        const photoroll: Photoroll = null;
          // imagePath1: responseData.photoroll.imagePath1,
          // imagePath2: responseData.photoroll.imagePath2,
          // imagePath3: responseData.photoroll.imagePath3,
          photoroll.noPhotos = responseData.photoroll.imagePaths.length;
          photoroll.imagePaths = responseData.photoroll.imagePaths;
          this.photoroll = photoroll;
        // this.router.navigate(["/"]);

      });
  }
   initialize () {
     let photoroll: Photoroll = new Photoroll(4,['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history']);
     this.photoroll =photoroll;
     // console.log(this.photoroll);
     return this.photoroll ;
   }

}
