import {Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {SponsorsService} from '../services/sponsors.service';
import {Sponsor} from '../models/sponsor.model'
import {FadeInService} from "../../shared/fade-in.service";
import {Subscription} from 'rxjs';
import {SponsorInitializationService} from '../../sponsor-initialization.service';
import { HttpBackend } from '@angular/common/http';

import { environment } from '../../../environments/environment';
// const backend_uri = environment.backend_uri;
import { ɵDomSanitizerImpl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  backend_uri = 'http://localhost:3000/';
  reader = new FileReader();
  
  constructor(
    // private sponsorInitializationService: SponsorInitializationService,
    private _SponsorsService:SponsorsService,
    private fadeInService: FadeInService,
    private sanitizer:DomSanitizer,
    protected _sanitizerImpl: ɵDomSanitizerImpl) { }

  // sponsorsInfo :Sponsor[]=[];
  sponsorsInfo: any;
  isGettingSponsors: boolean = false;
  private sub: Subscription;
  ngOnInit(): void {
    this._SponsorsService.getActivated()
    .subscribe(res => {
      this.sponsorsInfo = res;
      // console.log('RES RECIEVED ACTIVATED', this.sponsorsInfo);
      for(let sp of this.sponsorsInfo){
        sp.logo = this.backend_uri +  sp.logo; 
        // sp.logo = './' + sp.logo;
        // console.log(sp.logo);
        let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sp.logo);
        let sanitizedUrl = this._sanitizerImpl.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        sp.sani = sanitizedUrl;
      }
      
    }, error => {
      console.log('ERROR SPONSORS :: ',error);
    });

    //re-add subscription?


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
