import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
const backend_uri = environment.backend_uri;

import { Prize } from '../models/prize.model';

@Injectable()
export class PrizeService {

  dummyPrizes:Prize[]=[
    {
      competitionName:'shell',
      title:'prize1',
      description:'we winnnnn!!!!',
      imagePrize:'assets/img/image1.jpg'
    },
    {
      competitionName:'shell',
      title:'prize11',
      description:'we winnnnnnnn!!!!',
      imagePrize:'assets/img/image2.jpg'
    },
    {
      competitionName:'shell',
      title:'prize111',
      description:'we winnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn!!!!',
      imagePrize:'assets/img/image3.jpg'
    },
  ]



  constructor(private http: HttpClient) {
  }

  storePrize(prizeFormData:FormData) {
    return this.http.post('', prizeFormData);
  }

  getPrize(competitionName:string){
    return this.dummyPrizes;
  }
}
