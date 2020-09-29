import {Component, OnDestroy, OnInit} from '@angular/core';
import {SponsorsService} from '../services/sponsors.service';
import {Sponsor} from '../models/sponsor.model'
import {FadeInService} from "../../shared/fade-in.service";
import {Subscription} from 'rxjs';
import {SponsorInitializationService} from '../../sponsor-initialization.service';
import { HttpBackend } from '@angular/common/http';

import { environment } from '../../../environments/environment';
// const backend_uri = environment.backend_uri;
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  backend_uri = environment.backend_uri;
  reader = new FileReader();
  
  constructor(
    // private sponsorInitializationService: SponsorInitializationService,
    private _SponsorsService:SponsorsService,
    private fadeInService: FadeInService,
    private sanitizer:DomSanitizer) { }

  // sponsorsInfo :Sponsor[]=[];
  sponsorsInfo: any;
  isGettingSponsors: boolean = false;
  private sub: Subscription;
  ngOnInit(): void {
    this._SponsorsService.getActivated()
    .subscribe(res => {
      this.sponsorsInfo = res;
      console.log('RES RECIEVED ACTIVATED', this.sponsorsInfo);
      for(let sp of this.sponsorsInfo){
        sp.logo = this.backend_uri + '/' + sp.logo;
        console.log(sp.logo);
        let unsafeImageUrl = URL.createObjectURL(res);
        sp.logo = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        // let objectURL = 'data:image/jpeg;base64,' + res.image;
        // const mediaSource = new MediaSource();

      }
      console.log('AFTER', this.sponsorsInfo);
    }, error => {
      console.log('ERROR SPONSORS :: ',error);
    });


    // this.sponsorInitializationService.Initialized++;
    // this.sub = this._SponsorsService.isGettingSponsors.subscribe(
    //   (value) => {
    //     this.isGettingSponsors = value;
    //   }
    // );
    // const promise = this._SponsorsService.getTrueCheckedSponsors();
    // promise.then(value => {
    //   this.sponsorsInfo = value;
    // }, reason => {
    //   console.log(reason);
    // });
    // this._SponsorsService.checkedSponsors.subscribe(
    //   (sponsors:Sponsor[])=>{
    //     this.sponsorsInfo=sponsors;
    //   })
    this.fadeInService.fadeIn();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
