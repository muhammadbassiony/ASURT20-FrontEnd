import {Component, OnDestroy, OnInit, Input, SecurityContext} from '@angular/core';
import {SponsorsService} from '../services/sponsors.service';
import {Sponsor} from '../models/sponsor.model'
import {FadeInService} from "../../shared/fade-in/fade-in.service";
import {Subscription} from 'rxjs';
import { HttpBackend } from '@angular/common/http';

import { environment } from '../../../environments/environment';
// const backend_uri = environment.backend_uri;
import { ɵDomSanitizerImpl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ErrorService} from "../../shared/errorModal/error.service";

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  backend_uri = environment.backend_uri_static;
  // reader = new FileReader();
  @Input() AltSponsor = true

  constructor(
    // private sponsorInitializationService: SponsorInitializationService,
    private _SponsorsService:SponsorsService,
    private fadeInService: FadeInService,
    private errorService: ErrorService,
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
        sp.logo =  sp.logo;
        // sp.logo = './' + sp.logo;
        // console.log(sp.logo);
        let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(sp.logo);
        let sanitizedUrl = this._sanitizerImpl.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
        sp.sani = sanitizedUrl;
        // console.log(sp.sani);
      }

    }, (error) => {
      this.errorService.passError('Error Getting Sponsors!', '/home')
    });

    this.fadeInService.fadeIn();
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }


}
