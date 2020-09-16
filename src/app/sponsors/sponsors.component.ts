import { Component, OnInit } from '@angular/core';
import {SponsorsService} from '../services/sponsors.service';
import {Sponsor} from '../models/sponsor.model'
import {FadeInService} from "../fade-in.service";

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  constructor(private _SponsorsService:SponsorsService, private fadeInService: FadeInService) { }

  sponsorsInfo :Sponsor[]=[];

  ngOnInit(): void {
    this.sponsorsInfo = this._SponsorsService.getTrueCheckedSponsors();
    this._SponsorsService.checkedSponsors.subscribe(
      (sponsors:Sponsor[])=>{
        this.sponsorsInfo=sponsors;
      })
    this.fadeInService.fadeIn();
  }



}
