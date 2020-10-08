import { Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {SponsorsService} from '../../services/sponsors.service';
import {Sponsor} from '../../models/sponsor.model';

import {Subscription} from 'rxjs';

import { environment } from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
const backend_uri = environment.backend_uri;

import { ImgMimeType } from '../../../shared/img-mime-type.validator';



@Component({
  selector: 'app-sponsors-edit',
  templateUrl: './sponsors-edit.component.html',
  styleUrls: ['./sponsors-edit.component.css']
})
export class SponsorsEditComponent implements OnInit, OnDestroy {

  sponsorEditForm : FormGroup;
  // sponsorsInfo : Sponsor[];
  sponsorsInfo: any;
  // isChecked :boolean[] =[];
  // selectedImg: File = null;
  isGettingSponsors: boolean = false;
  // isGettingSub: Subscription;
  message: string = null;
  // successResSub: Subscription;
  // errorResSub: Subscription;
  // allRequests: number = 0;
  // successRequests: number = 0;
  editMessage: string = null;

  constructor(
    private _SponsorsService:SponsorsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isGettingSponsors = true;
    this._SponsorsService.getAllSponsors()
    .subscribe(res => {
      this.sponsorsInfo = res;
      for(let sp of this.sponsorsInfo){
        sp.logo = sp.logo; 
      }
      this.isGettingSponsors = false;
    }, 
    error => {
      console.log('ERROR SPONSORS-EDIT :: ',error);
    });

    this.sponsorEditForm = this.fb.group({
      'sponsorName': [ , [Validators.required, Validators.minLength(5)]],
      'sponsorDesc': [ , [Validators.required, Validators.minLength(5)]],
      'sponsorsLogo': [ , [Validators.required]]  //img mime NOT working??
    });
    
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {

    const file = event.target.files[0]
    this.sponsorEditForm.value.sponsorsLogo = file;
    console.log("The Form",this.sponsorEditForm)
  }}

  onSubmit(sponsorsForm: FormGroup)
  {
    console.log('SPNSR FORM ::\n', sponsorsForm);
    // let name = sponsorsForm.value.sponsorName;
    // let desc = sponsorsForm.value.sponsorDesc;
    // console.log(sponsorsForm.value, name, desc);
    // let fd = new FormData();
    // fd.append('name', name);
    // fd.append('desc', desc);
    // fd.append('logo', this.sponsorEditForm.value.sponsorLogo);
    // console.log('FORM DATA', fd);
    let fd = this.sponsorEditForm.value;
    console.log('OBJECT FD :: \n', fd);
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

  // async changeState()
  // {
  //   this.successResSub = this._SponsorsService.editResponseSuccess.subscribe(success => {
  //     this.successRequests++;
  //     this.allRequests++;
  //     // console.log(success);
  //   });
  //   this.errorResSub = this._SponsorsService.editResponseError.subscribe(error => {
  //     this.allRequests++;
  //     // console.log(error);
  //   });
  //   await this._SponsorsService.editSponsorsState(this.isChecked);
  //   // console.log("All: " + this.allRequests.toString());
  //   // console.log("Success: " + this.successRequests.toString());
  //   if (this.allRequests != this.successRequests) {
  //     const errors = this.allRequests - this.successRequests;
  //     this.editMessage = `There were ${errors} errors while processing your edit request!`;
  //   } else {
  //     this.editMessage = 'All requests are a success!'
  //   }
  //   this.successRequests = 0;
  //   this.allRequests = 0;
  //   this.successResSub.unsubscribe();
  //   this.errorResSub.unsubscribe();
  // }


  img: File = null;
  onImgUpdated(files: FileList) {
    this.img = files.item(0);
    console.log(this.img);

    //crude validation - mime type async validator not working here
    // console.log(!this.img.type.match(/^image\//));
    if(!this.img.type.match(/^image\//)){
      alert("Only image files are allowed");
      this.sponsorEditForm.get('sponsorLogo').setErrors({ 'invalidFormat': true });
      return;
    }

    this.sponsorEditForm.patchValue({"sponsorLogo": this.img});
    this.sponsorEditForm.get('sponsorLogo').updateValueAndValidity();
    console.log(this.sponsorEditForm);
  }

  ngOnDestroy() {
    // this.isGettingSub.unsubscribe();
  }

}
