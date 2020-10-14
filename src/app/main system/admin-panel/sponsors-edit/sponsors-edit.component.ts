import { Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Location } from "@angular/common";
import {SponsorsService} from '../../services/sponsors.service';
import {Sponsor} from '../../models/sponsor.model';

import {Subscription} from 'rxjs';

import { environment } from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';

import { ImgMimeType } from '../../../shared/img-mime-type.validator';



@Component({
  selector: 'app-sponsors-edit',
  templateUrl: './sponsors-edit.component.html',
  styleUrls: ['./sponsors-edit.component.css']
})
export class SponsorsEditComponent implements OnInit {

  backend_uri = environment.backend_uri_static;
  sponsorEditForm : FormGroup;
  sponsorsInfo: any;
  isGettingSponsors: boolean = false;
  message: string = null;
  editMessage: string = null;

  constructor(
    private _SponsorsService:SponsorsService,
    private fb: FormBuilder,
    private location: Location
  ){ }

  ngOnInit(): void {
    this.isGettingSponsors = true;
    this._SponsorsService.getAllSponsors()
    .subscribe(res => {
      this.sponsorsInfo = res;
      for(let sp of this.sponsorsInfo){
        sp.logoCopy = this.backend_uri +  sp.logo;
      }
      this.isGettingSponsors = false;
    },
    error => {
      console.log('ERROR SPONSORS-EDIT :: ',error);
    });

    this.sponsorEditForm = this.fb.group({
      'sponsorName': [ , [Validators.required, Validators.minLength(3)]],
      'sponsorDesc': [ , [Validators.required, Validators.minLength(5)]],
      'sponsorLogo': [ , [Validators.required]]  //img mime NOT working??
    });

  }

  onSubmit(sponsorEditForm: FormGroup){
    // console.log('SPNSR FORM ::\n', sponsorEditForm);
    let fd = {
      logo: this.img,
      // logo: this.sponsorEditForm.value.sponsorLogo,
      name: this.sponsorEditForm.value.sponsorName,
      desc: this.sponsorEditForm.value.sponsorDesc
    };
    // console.log('OBJECT FD :: \n', fd);
    this._SponsorsService.addNewSponsor(fd)
    .subscribe((value) => {    //will work
      this.message = 'Sponsor created successfully!';
      this.sponsorEditForm.reset();
    },
    error => {
      this.message = error;
      console.log(error);
    });
  }

  changeState(){
    this._SponsorsService.updateAllSponsors(this.sponsorsInfo)
    .subscribe(res => {
      this.editMessage = 'All requests are a success!';
    },
    error => {
      this.editMessage = error;
    });
  }

   onEditSponsor(sponsor) {
    this.sponsorEditForm.patchValue({'sponsorName': sponsor.name});
    this.sponsorEditForm.patchValue({'sponsorDesc': sponsor.desc});
  }


  img: File = null;
  onImgUpdated(files: FileList) {
    this.img = files.item(0);
    // console.log(this.img);

    //crude validation - mime type async validator not working here
    // console.log(!this.img.type.match(/^image\//));
    if(!this.img.type.match(/^image\//)){
      alert("Only image files are allowed");
      this.sponsorEditForm.get('sponsorLogo').setErrors({ 'invalidFormat': true });
      return;
    }

    this.sponsorEditForm.patchValue({"sponsorLogo": this.img});
    this.sponsorEditForm.get('sponsorLogo').updateValueAndValidity();
    // console.log(this.sponsorEditForm);
  }

  goBack() {
    this.location.back();
  }
}
