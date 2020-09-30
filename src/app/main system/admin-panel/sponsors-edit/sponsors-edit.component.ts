import { Component, OnDestroy, OnInit, SecurityContext} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {SponsorsService} from '../../services/sponsors.service';
import {Sponsor} from '../../models/sponsor.model';

import {Subscription} from 'rxjs';
import {SponsorInitializationService} from '../../../sponsor-initialization.service';

import { environment } from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
const backend_uri = environment.backend_uri;

import { ImgMimeType } from '../../../shared/img-mime-type.validator';

//  TODO
// 1- edit already existing sponsor 

@Component({
  selector: 'app-sponsors-edit',
  templateUrl: './sponsors-edit.component.html',
  styleUrls: ['./sponsors-edit.component.css']
})
export class SponsorsEditComponent implements OnInit, OnDestroy {

  backend_uri = 'http://localhost:3000/';
  sponsorEditForm : FormGroup;
  // sponsorsInfo : Sponsor[];
  sponsorsInfo: any;
  isChecked :boolean[] =[];
  selectedImg: File = null;
  isGettingSponsors: boolean = false;
  isGettingSub: Subscription;
  message: string = null;
  successResSub: Subscription;
  errorResSub: Subscription;
  allRequests: number = 0;
  successRequests: number = 0;
  editMessage: string = null;

  constructor(
    private sponsorInitializationService: SponsorInitializationService,
    private _SponsorsService:SponsorsService,
    private fb: FormBuilder,
    // private sanitizer:DomSanitizer,
    // protected _sanitizerImpl: ɵDomSanitizerImpl
  ) {}

  ngOnInit(): void {
    this._SponsorsService.getAllSponsors()
    .subscribe(res => {
      this.sponsorsInfo = res;
      console.log('SPONSORSINFO :: \n', this.sponsorsInfo);
      for(let sp of this.sponsorsInfo){
        // sp.logo = this.backend_uri +  sp.logo; 
        sp.logo = sp.logo; 
      }
    }, 
    error => {
      console.log('ERROR SPONSORS-EDIT :: ',error);
    });

    // this.sponsorInitializationService.Initialized++;
    // this.isGettingSub = this._SponsorsService.isGettingSponsors.subscribe(
    //   (value) => {
    //     this.isGettingSponsors = value;
    //   }
    // );
    // const promise = this._SponsorsService.getAllSponsorsInfo();
    // promise.then(value => {
    //   this.sponsorsInfo = <Array<Sponsor>>value;
    //   for (let i = 0; i < this.sponsorsInfo.length; i++) {
    //     this.isChecked.push(this.sponsorsInfo[i].isChecked);
    //   }
    // }, reason => {
    //   console.log(reason);
    // });
    // // this.sponsorsInfo = this._SponsorsService.getAllSponsorsInfo();
    // this._SponsorsService.allSponsors.subscribe(
    // (sponsors:Sponsor[])=>{
    //   this.sponsorsInfo=sponsors;
    //   this.isChecked.splice(0, this.isChecked.length);
    //   for (let i = 0; i < this.sponsorsInfo.length; i++) {
    //     this.isChecked.push(this.sponsorsInfo[i].isChecked);
    //   }
    // })
    // this.sponsorEditForm = new FormGroup({
    //   'sponsorLogo' : new FormControl('', { 
    //     validators:[Validators.required], 
    //     asyncValidator: [ImgMimeType] 
    //   }),
    //   'sponsorName' : new FormControl('', Validators.required,),
    //   'sponsorDesc' : new FormControl('', Validators.required)
    // });
    this.sponsorEditForm = this.fb.group({
      'sponsorName': [ , [Validators.required, Validators.minLength(5)]],
      'sponsorDesc': [ , [Validators.required, Validators.minLength(5)]],
      'sponsorLogo': [ , [Validators.required], [ImgMimeType]]
    });
  }

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
    let fd = {
      name: this.sponsorEditForm.value.sponsorName,
      desc: this.sponsorEditForm.value.sponsorDesc,
      logo: this.sponsorEditForm.value.sponsorLogo
    } 
    console.log('OBJECT FD :: \n', fd);
    this._SponsorsService.newSponsor(fd)
    // .subscribe((value) => {
    //   this.message = 'Sponsor created successfully!';
    //   this.sponsorEditForm.reset();
    //   }, 
    // (reason: HttpErrorResponse) => {
    //   this.message = reason.message;
    //   console.log(reason);
    // });
  }

  changeState(){
    console.log('CHANGED STATE', this.sponsorsInfo);
    //update sponsors in backend here
    this._SponsorsService.updateAllSponsors(this.sponsorsInfo)
    .subscribe(res => {
      console.log('UPDATED ALL SPONSORS RES :: \n', res);
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
