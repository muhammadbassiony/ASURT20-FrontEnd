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

  ]
  constructor(private http: HttpClient) {
  }
  storePrize(prizeFormData:FormData) {
    return  this.http.post('', prizeFormData)
  }


  getPrize(competitionName:string){
    // return this.http.get<Prize[]>(`/${competitionName}`)
    return this.dummyPrizes;
  }
}
