import {EventEmitter, Injectable, OnInit} from '@angular/core';
import { Sponsor } from '../models/sponsor.model';
import {Observable, Subject} from 'rxjs';
import {BackEndURLService} from './back-end-url.service';
import {HttpClient} from '@angular/common/http';
import {SponsorInitializationService} from '../sponsor-initialization.service';

interface SponsorPostResponse {
  desc: string,
  id: string,
  logo: string,
  message: string,
  name: string
}
interface SponsorGetResponse {
  createdAt: string,
  desc: string,
  isChecked: boolean,
  logo: string,
  name: string,
  updatedAt: string,
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private sponsorInitializationService: SponsorInitializationService,
              private http: HttpClient,
              private backEndURLService: BackEndURLService) {
  }
  private allSponsorsInfo : Sponsor[]=[
    new Sponsor("assets/img/kader.png", "Arab Organization for Industrialization",'KADER factory for developed industries was established in 1949 under the name of "HELIOPOLIS AIRCRAFT FACTORY" to produce the primary training Aircraft ..', true, '1'),
    new Sponsor("assets/img/alumisr.png", "ALUMISR", "Alumisr company produces aluminum for the purposes of the various use with many finishes.It was established in 1977", true, '2'),
    new Sponsor("assets/img/emar.png", "EMAR", "Emaar Misr is one of the largest real estate companies in Egypt and the developer of iconic projects such as Uptown Cairo, Marassi, and Mivida", true, '3')
  ]

  private trueCheckedSponsors :Sponsor[]=[];

  checkedSponsors = new Subject<Sponsor[]>();
  allSponsors = new Subject<Sponsor[]>();
  isGettingSponsors = new Subject<boolean>();

  async initialize() {
    let res = await this.http.get<{sponsors: SponsorGetResponse[]}>(this.backEndURLService.getURL() + "api/sponsors/get").toPromise();
    console.log(typeof res);
    this.allSponsorsInfo.splice(0, this.allSponsorsInfo.length);
    console.log(res);
    const sponsorsArray = <Array<SponsorGetResponse>> res.sponsors
    for (let i = 0; i < sponsorsArray.length; i++) {
      this.allSponsorsInfo.push(new Sponsor(this.backEndURLService.getURL() + sponsorsArray[i].logo,
        sponsorsArray[i].name,
        sponsorsArray[i].desc,
        sponsorsArray[i].isChecked,
        sponsorsArray[i]._id));
    }
    // this.http.get<{sponsors: SponsorGetResponse[]}>(this.backEndURLService.getURL() + "api/sponsors/get").subscribe(
    //   (res) => {
    //     this.allSponsorsInfo.splice(0, this.allSponsorsInfo.length);
    //     console.log(res);
    //     const sponsorsArray = <Array<SponsorGetResponse>> res.sponsors
    //     for (let i = 0; i < sponsorsArray.length; i++) {
    //       this.allSponsorsInfo.push(new Sponsor(this.backEndURLService.getURL() + sponsorsArray[i].logo,
    //         sponsorsArray[i].name,
    //         sponsorsArray[i].desc,
    //         sponsorsArray[i].isChecked,
    //         sponsorsArray[i]._id));
    //     }
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
    console.log(this.allSponsorsInfo);
  }

  async getAllSponsorsInfo()
  {
    if (this.sponsorInitializationService.Initialized == 1) {
      this.isGettingSponsors.next(true);
      await this.initialize();
      this.isGettingSponsors.next(false);
    }
    return this.allSponsorsInfo.slice();
  }

  addSponsor(sponsor: Sponsor, fd: FormData)
  {
    this.http.post<SponsorPostResponse>(this.backEndURLService.getURL() + "api/sponsors/add", fd).subscribe(
      (res) => {
      console.log(res);
    }, (error) => {
      console.log(error);
    });
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
      if (value !== this.allSponsorsInfo[i].isChecked)
      {
        console.log(this.allSponsorsInfo[i].id)
        const URL = this.backEndURLService.getURL() + "api/sponsors/activate/" + this.allSponsorsInfo[i].id;
        this.http.patch<any>(URL, {}).subscribe(
            (res) => {
              console.log(res);
            }, error => {
              console.log(error);
            }
        );
        this.allSponsorsInfo[i].isChecked = value;
      }
      i++;
    }
    this.allSponsors.next(this.allSponsorsInfo.slice());
    let sponsors = this.getTrueCheckedSponsors();
    sponsors.then(value1 => {
      this.checkedSponsors.next(value1);
    });
  }

  async getTrueCheckedSponsors()
  {
    if (this.sponsorInitializationService.Initialized == 1) {
      this.isGettingSponsors.next(true);
      await this.initialize();
      this.isGettingSponsors.next(false);
    }
    this.trueCheckedSponsors = [];
    for (let i = 0; i < this.allSponsorsInfo.length; i++) {
      if (this.allSponsorsInfo[i].isChecked == true) {
        this.trueCheckedSponsors.push(this.allSponsorsInfo[i]);
      }
    }
    return this.trueCheckedSponsors;
  }
}
