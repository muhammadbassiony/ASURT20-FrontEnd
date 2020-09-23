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
  selectedImg: File = null;
  constructor(private _SponsorsService:SponsorsService) {}

  ngOnInit(): void {
    this._SponsorsService.initialize();
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
    let fd = new FormData();
    fd.append('name', name);
    fd.append('desc', desc);
    fd.append('logo', this.selectedImg, this.selectedImg.name);
    this._SponsorsService.addSponsor(addedSponsor, fd);
  }

  changeState()
  {
    this._SponsorsService.editSponsorsState(this.isChecked);
  }

  onImgUpdated(event) {
    this.selectedImg = <File>event.target.files[0];
    console.log(this.selectedImg);
  }

}
