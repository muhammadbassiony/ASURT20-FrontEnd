import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import {Photoroll} from "./photoroll.model";

@Injectable({ providedIn: 'root' })
export class PhotorollService {
  public photoroll: Photoroll;
  // private postsUpdated = new Subject<Photoroll>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPhotos() {
    this.http
      .get<{ message: string; posts: any }>("http://localhost:3000/api/photo-roll")
      .pipe(
        map(photoData => {
          return photoData.posts.map(photoroll => {
            return {
              imagePath1: photoroll.imagePath1,
              imagePath2: photoroll.imagePath2,
              imagePath3: photoroll.imagePath3,
            };
          });
        })).subscribe(transformedPhotos => {
          this.photoroll = transformedPhotos.photoroll;
        });
  }
  addPhotoroll(image1: File, image2: File, image3: File) {
    const photoroll  = new FormData();
    photoroll.append("image1", image1);
    photoroll.append("image2", image2);
    photoroll.append("image3", image3);
    console.log(image1);
    this.http
      .post<{ message: string; photoroll: Photoroll }>(
        "http://localhost:3000/api/photo-roll",
        photoroll
      )
      .subscribe(responseData => {
        const photoroll: Photoroll = {
          imagePath1: responseData.photoroll.imagePath1,
          imagePath2: responseData.photoroll.imagePath2,
          imagePath3: responseData.photoroll.imagePath3,
        };
        this.photoroll = photoroll;
        // this.router.navigate(["/"]);
      });

  }
}
