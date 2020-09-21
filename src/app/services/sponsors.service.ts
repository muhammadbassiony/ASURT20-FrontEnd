import { Injectable } from '@angular/core';
import { Sponsor } from '../models/sponsor.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor() { }
  private allSponsorsInfo : Sponsor[]=[
    new Sponsor("assets/img/kader.png", "Arab Organization for Industrialization",'KADER factory for developed industries was established in 1949 under the name of "HELIOPOLIS AIRCRAFT FACTORY" to produce the primary training Aircraft ..', true, 1),
    new Sponsor("assets/img/alumisr.png", "ALUMISR", "Alumisr company produces aluminum for the purposes of the various use with many finishes.It was established in 1977", true, 2),
    new Sponsor("assets/img/emar.png", "EMAR", "Emaar Misr is one of the largest real estate companies in Egypt and the developer of iconic projects such as Uptown Cairo, Marassi, and Mivida", true, 3)
  ]

  private trueCheckedSponsors :Sponsor[]=[];

  checkedSponsors = new Subject<Sponsor[]>();
  allSponsors = new Subject<Sponsor[]>();

  getAllSponsorsInfo()
  {
    return this.allSponsorsInfo.slice();
  }

  addSponsor(sponsor : Sponsor)
  {
    this.allSponsorsInfo.push(sponsor);
    this.allSponsors.next(this.allSponsorsInfo.slice());
  }

  editSponsorsState(checkedState:boolean[])
  {
    let i=0;
    for(var value of checkedState)
    {
      if(value == undefined)
      {
        value = false;
      }
      this.allSponsorsInfo[i].isChecked = value;
      i++;
    }
    this.allSponsors.next(this.allSponsorsInfo.slice());
    let sponsors = this.getTrueCheckedSponsors();
    this.checkedSponsors.next(sponsors);
  }

  getTrueCheckedSponsors()
  {
    this.trueCheckedSponsors = [];
    for(var value of this.allSponsorsInfo)
    {
      if(value.isChecked == true)
      {
        this.trueCheckedSponsors.push(value);
      }
    }
    return this.trueCheckedSponsors;
  }
}
