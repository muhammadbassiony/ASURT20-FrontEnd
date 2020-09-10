import { Component, OnInit } from '@angular/core';
import {SponsorsService} from './sponsors.service';
import {Sponsor} from './sponsor.model'

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  constructor(private _SponsorsService:SponsorsService) { }

  sponsorsInfo :Sponsor[]=[];

  ngOnInit(): void {
    this.sponsorsInfo = this._SponsorsService.getTrueCheckedSponsors();
    this._SponsorsService.checkedSponsors.subscribe(
      (sponsors:Sponsor[])=>{
        this.sponsorsInfo=sponsors;
      })
  }

  

}
