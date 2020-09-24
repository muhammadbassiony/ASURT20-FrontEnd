import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {SponsorsService} from '../../services/sponsors.service'
import {Sponsor} from '../../models/sponsor.model'
import {Subscription} from 'rxjs';
import {SponsorInitializationService} from '../../sponsor-initialization.service';

import { environment } from '../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
const backend_uri = environment.backend_uri;

//  TODO
// 1- reset forms after new sponsor submit

@Component({
  selector: 'app-sponsors-edit',
  templateUrl: './sponsors-edit.component.html',
  styleUrls: ['./sponsors-edit.component.css']
})
export class SponsorsEditComponent implements OnInit, OnDestroy {

  sponsorEditForm : FormGroup;
  sponsorsInfo : Sponsor[];
  isChecked :boolean[] =[];
  selectedImg: File = null;
  isGettingSponsors: boolean = false;
  sub: Subscription;
  message: string = null;
  constructor(private sponsorInitializationService: SponsorInitializationService,
              private _SponsorsService:SponsorsService) {}

  ngOnInit(): void {
    this.sponsorInitializationService.Initialized++;
    this.sub = this._SponsorsService.isGettingSponsors.subscribe(
      (value) => {
        this.isGettingSponsors = value;
      }
    );
    const promise = this._SponsorsService.getAllSponsorsInfo();
    promise.then(value => {
      this.sponsorsInfo = <Array<Sponsor>>value;
      for (let i = 0; i < this.sponsorsInfo.length; i++) {
        this.isChecked.push(this.sponsorsInfo[i].isChecked);
      }
    }, reason => {
      console.log(reason);
    });
    // this.sponsorsInfo = this._SponsorsService.getAllSponsorsInfo();
    this._SponsorsService.allSponsors.subscribe(
    (sponsors:Sponsor[])=>{
      this.sponsorsInfo=sponsors;
      this.isChecked.splice(0, this.isChecked.length);
      for (let i = 0; i < this.sponsorsInfo.length; i++) {
        this.isChecked.push(this.sponsorsInfo[i].isChecked);
      }
    })
    this.sponsorEditForm = new FormGroup({
      'sponsorLogo' : new FormControl('', Validators.required),
      'sponsorName' : new FormControl('', Validators.required),
      'sponsorDesc' : new FormControl('', Validators.required)
    })
  }

  onSubmit()
  {
    let name = this.sponsorEditForm.value.sponsorName;
    let desc = this.sponsorEditForm.value.sponsorDesc;
    let fd = new FormData();
    fd.append('name', name);
    fd.append('desc', desc);
    fd.append('logo', this.selectedImg, this.selectedImg.name);
    const promise = this._SponsorsService.addSponsor(fd);
    promise.then((value) => {
      this.message = 'Sponsor created successfully!';
      this.sponsorEditForm.reset();
      }, (reason: HttpErrorResponse) => {
      this.message = reason.message;
      console.log(reason);
    });
  }

  changeState()
  {
    this._SponsorsService.editSponsorsState(this.isChecked);
  }

  onImgUpdated(event) {
    this.selectedImg = <File>event.target.files[0];
    console.log(this.selectedImg);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
