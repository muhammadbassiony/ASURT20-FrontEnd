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
    
  // public photorollUpdated = new Subject<Photoroll>();
  // public photorollChanged = new Subject<Photoroll>();

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

  updatePhotoroll(newPh: any){
    let phForm = new FormData;
    phForm.append('_id', newPh._id);
    phForm.append('title', newPh.title);
    phForm.append('imgPaths', JSON.stringify(newPh.paths));
    // phForm.append('images', JSON.stringify(newPh.images));
    for (let i = 0; i < newPh.images.length; i++) {
      phForm.append(newPh.images[i].name, newPh.images[i])
    }

    return this.http.post(
      backend_uri + '/main/photorolls/update',
       phForm ,
      { responseType: 'json'}
    )
    .pipe(
      map(res => {
        let body = res['photoroll'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getPhotoroll(phId: string){
    return this.http.get(
      backend_uri + '/main/photorolls/get/' + phId,
      { responseType: 'json' }
    )
    .pipe(
      map(res => {
        let body = res['photoroll'];    
        return body || [];    
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

}
