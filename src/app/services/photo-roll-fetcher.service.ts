import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import{ BackEndURLService} from './back-end-url.service';
import {Photoroll} from "src/app/landing-page/photoroll.model";

//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';
const backend_uri = environment.backend_uri;

 interface PhotoRollBackEndModel {
  title: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PhotoRollFetcherService {
  
  p: Photoroll;
  constructor(private http:HttpClient) { }

  getPhotoRoll(id): Photoroll{
     var reqURL = backend_uri  + "api/photorolls/get/:" + id;
     this.http.get<PhotoRollBackEndModel>(reqURL).subscribe(( photo:PhotoRollBackEndModel) => {
       this.p.imagePaths=photo.images;
       this.p.noPhotos=photo.images.length;
       this.p.photorollName=photo.title;

     });
     return this.p;
  }

}
