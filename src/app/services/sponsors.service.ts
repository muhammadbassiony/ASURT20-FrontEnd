import { Injectable } from '@angular/core';
import { Sponsor } from '../models/sponsor.model';
import { Subject } from 'rxjs';
import {BackEndURLService} from './back-end-url.service';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private http: HttpClient, private backEndURLService: BackEndURLService) {
    this.initialize();
  }
  private allSponsorsInfo : Sponsor[]=[
    new Sponsor("assets/img/kader.png", "Arab Organization for Industrialization",'KADER factory for developed industries was established in 1949 under the name of "HELIOPOLIS AIRCRAFT FACTORY" to produce the primary training Aircraft ..', true, 1),
    new Sponsor("assets/img/alumisr.png", "ALUMISR", "Alumisr company produces aluminum for the purposes of the various use with many finishes.It was established in 1977", true, 2),
    new Sponsor("assets/img/emar.png", "EMAR", "Emaar Misr is one of the largest real estate companies in Egypt and the developer of iconic projects such as Uptown Cairo, Marassi, and Mivida", true, 3)
  ]

  private trueCheckedSponsors :Sponsor[]=[];

  checkedSponsors = new Subject<Sponsor[]>();
  allSponsors = new Subject<Sponsor[]>();

  initialize() {
    this.http.get<Sponsor[]>(this.backEndURLService.getURL() + "api/sponsors/get").subscribe(
      (res) => {
        // this.allSponsorsInfo = res;
        console.log(res);
      }, (error) => {
        console.log(error);
      }
    );
  }

  getAllSponsorsInfo()
  {
    return this.allSponsorsInfo.slice();
  }

  addSponsor(sponsor : Sponsor, sponsorImage: File)
  {
    // this.http.post<{message: string, token: string}>(this.backEndURLService.getURL() + "api/users/login", {
    //   email: 'admin@rcteam.com',
    //   password: 'Racing2020Team'
    // }).subscribe((res) => {
    //   const token = res.token;
    //   const helper = new JwtHelperService();
    //   console.log(helper.decodeToken(token));
    // }, error => console.log(error));
    this.http.post(this.backEndURLService.getURL() + "api/sponsors/add", {
      name: sponsor.name,
      desc: sponsor.desc,
      logo: sponsorImage
    }).subscribe((res) => {
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
      console.log('there')
      if (value !== this.allSponsorsInfo[i].isChecked)
      {
        console.log('here')
        const URL = this.backEndURLService.getURL() + "api/sponsors/activate/:" + i.toString();
        this.http.patch<{sponsors: Sponsor[], message: string}>(URL,{}).subscribe(
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
