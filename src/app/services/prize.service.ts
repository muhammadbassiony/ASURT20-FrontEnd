import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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

<<<<<<< HEAD
  ]
  constructor(private http: HttpClient) {
  }
  storePrize(prizeFormData:FormData) {
    return  this.http.post('', prizeFormData)
=======
  ];

  constructor(private http: HttpClient) {
  }

  storePrize(prizeFormData:FormData) {
    return  this.http.post('', prizeFormData);
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
  }


  getPrize(competitionName:string){
<<<<<<< HEAD
    // return this.http.get<Prize[]>(`/${competitionName}`)
=======
    // return this.http.get<Prize[]>(`/${competitionName}`);
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
    return this.dummyPrizes;
  }
}
