import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {SponsorsService} from '../../services/sponsors.service'
import {Sponsor} from '../../models/sponsor.model'

@Component({
  selector: 'app-sponsors-edit',
  templateUrl: './sponsors-edit.component.html',
  styleUrls: ['./sponsors-edit.component.css']
})
export class SponsorsEditComponent implements OnInit {

  sponsorEditForm : FormGroup;
  sponsorsInfo : Sponsor[];
  isChecked :boolean[] =[];

  constructor(private _SponsorsService:SponsorsService) {}

  ngOnInit(): void {
    this.sponsorsInfo= this._SponsorsService.getAllSponsorsInfo(); 
    this._SponsorsService.allSponsors.subscribe(
    (sponsors:Sponsor[])=>{
      this.sponsorsInfo=sponsors;
    })
  
    this.sponsorEditForm = new FormGroup({
      'sponsorLogo' : new FormControl('', Validators.required),
      'sponsorName' : new FormControl('', Validators.required),
      'sponsorDesc' : new FormControl('', Validators.required)
    })
  }

  onSubmit()
  {  
    let logo = this.sponsorEditForm.value.sponsorLogo;
    let name = this.sponsorEditForm.value.sponsorName;
    let desc = this.sponsorEditForm.value.sponsorDesc;
    let addedSponsor = new Sponsor (logo, name, desc,false, 2022);
    this._SponsorsService.addSponsor(addedSponsor);
  }

  changeState()
  {
    this._SponsorsService.editSponsorsState(this.isChecked);
  }

}
