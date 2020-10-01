import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";
import { Photoroll } from "../models/photoroll.model";

import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
const backend_uri = environment.backend_uri;

@Injectable({ providedIn: 'root' })
export class PhotorollService {
  
  // public photoroll: Photoroll[] =  [
  //   new Photoroll(1,'prize', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history'] ),
  //   new Photoroll(1, 'landing-page', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history'])
  // ];
  // photorollUpdated = new Subject<Photoroll>();
  public photorollChanged = new Subject<Photoroll>();
  //public photorollChanged = new BehaviorSubject<Photoroll>(this.photoroll[1]);
  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  getAllPhotorolls(){
    return this.http.get( backend_uri + '/main/photorolls/get-all')
    .pipe(
      map(res => {
        let body = res['photorolls'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  // initialize () {
  //   const photoroll: Photoroll = new Photoroll(1, 'landing-page', 4, ['https://placeimg.com/1080/500/nat','https://placeimg.com/1080/500/nature','https://placeimg.com/1080/500/arch','https://placeimg.com/1080/500/history']);
  //   this.photoroll.push(photoroll) ;
  //   // console.log(this.photoroll);
  //   return this.photoroll ;
  // }

  // getPhotorollByName(name: string): Photoroll {
  //   for (let i = 0; i < this.photoroll.length; i++)  {
  //     if (this.photoroll[i].photorollName === name) {
  //       console.log('founded');
  //       return this.photoroll[i];
  //     }
  //     console.log('not found');
  //   }
  //   return null;
  // }


  // // getPhotos() {
  // //   this.http
  // //     .get<{ message: string; imagePaths: string[] }>("http://localhost:3000/api/photo-roll")
  // //     // .pipe(
  // //       // map(photoData => {
  // //       //   return photoData.photos.map(photoroll => {
  // //       //     return {
  // //       //       imagePaths: photoroll.imagePaths,
  // //       //       noPhotos: photoroll.imagePaths.length
  // //       //     };
  // //       //   });
  // //       // })).subscribe(transformedPhotos => {
  // //     .subscribe(imagePaths => {
  // //         this.photoroll.imagePaths = imagePaths.imagePaths;
  // //         this.photoroll.noPhotos = imagePaths.imagePaths.length;
  // //         this.photorollUpdated.next(this.photoroll);
  // //       });
  // // }
  // //
  // // addPhotoroll(activeImage: File, otherImages: File[]) {
  // //   const photoroll  = new FormData();
  // //   photoroll.append("activeImage", activeImage);
  // //   for (let i = 0 ; i< otherImages.length;i++) {
  // //     photoroll.append("otherImages", otherImages[i]);
  // //   }
  // //   //console.log(photoroll); //form data
  // //   console.log(activeImage);
  // //   console.log(otherImages); //image selected on other images
  // //   this.http
  // //     .post<{ message: string; photoroll: Photoroll }>(
  // //       "http://localhost:3000/api/photo-roll",
  // //       photoroll
  // //     )
  // //     .subscribe(responseData => {
  // //       const photoroll: Photoroll = null;
  // //         // imagePath1: responseData.photoroll.imagePath1,
  // //         // imagePath2: responseData.photoroll.imagePath2,
  // //         // imagePath3: responseData.photoroll.imagePath3,
  // //         photoroll.noPhotos = responseData.photoroll.imagePaths.length;
  // //         photoroll.imagePaths = responseData.photoroll.imagePaths;
  // //         this.photoroll = photoroll;
  // //       // this.router.navigate(["/"]);
  // //
  // //     });
  // // }


  // updatePhotoroll(value: any , newPhotoroll: Photoroll) {
  //   this.photoroll[value.index] = newPhotoroll;
  //   this.photoroll[value.index].noPhotos =  newPhotoroll.imagePaths.length;
  //   console.log(this.photoroll[value.index]);
  //   let pr = this.photoroll[value.index];
  //   this.photorollChanged.next(pr);
  //   console.log("done updating photoroll");

  // }
}
