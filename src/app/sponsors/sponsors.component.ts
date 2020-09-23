import {Component, OnDestroy, OnInit} from '@angular/core';
import {SponsorsService} from '../services/sponsors.service';
import {Sponsor} from '../models/sponsor.model'
import {FadeInService} from "../fade-in.service";
import {Subscription} from 'rxjs';
import {SponsorInitializationService} from '../sponsor-initialization.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {

  constructor(private sponsorInitializationService: SponsorInitializationService,
              private _SponsorsService:SponsorsService,
              private fadeInService: FadeInService) { }

  sponsorsInfo :Sponsor[]=[];
  isGettingSponsors: boolean = false;
  private sub: Subscription;
  ngOnInit(): void {
    this.sponsorInitializationService.Initialized++;
    this.sub = this._SponsorsService.isGettingSponsors.subscribe(
      (value) => {
        this.isGettingSponsors = value;
      }
    );
    const promise = this._SponsorsService.getTrueCheckedSponsors();
    promise.then(value => {
      this.sponsorsInfo = value;
    }, reason => {
      console.log(reason);
    });
    this._SponsorsService.checkedSponsors.subscribe(
      (sponsors:Sponsor[])=>{
        this.sponsorsInfo=sponsors;
      })
    this.fadeInService.fadeIn();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
