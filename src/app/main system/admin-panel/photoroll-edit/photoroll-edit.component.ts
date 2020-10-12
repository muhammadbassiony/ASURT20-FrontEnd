import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, 
  FormControl, 
  FormGroup, 
  Validators, 
  ReactiveFormsModule, 
  RequiredValidator, 
  FormArray} from '@angular/forms';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ImgMimeType } from '../../../shared/img-mime-type.validator';

import { Photoroll } from '../../models/photoroll.model';
import { PhotorollService } from '../../services/photoroll.service';
import { ErrorService } from '../../../shared/errorModal/error.service';

import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-photoroll-edit',
  templateUrl: './photoroll-edit.component.html',
  styleUrls: ['./photoroll-edit.component.css']
})
export class PhotorollEditComponent implements OnInit {
 
  backend_uri = environment.backend_uri_static;
  allPhotorolls: any;
  photorollForm: FormGroup; // for edit by path
  currentPhotoroll: any; // stores all needed to edit photoroll properties

  constructor( 
    private errorService: ErrorService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public photorollService: PhotorollService
  ) { }


  ngOnInit(){
    this.photorollService.getAllPhotorolls()
    .subscribe(res => {
      this.allPhotorolls = res;
      console.log('RECEIVED ALL PHS ::\n', this.allPhotorolls);
    });

    this.photorollForm = this.fb.group({
      'images': this.fb.array([])
    });
  }

  
  onPhotorollSelect(){
    console.log('CHANGE ::', this.currentPhotoroll);
    
    // this.photorollForm.reset();
    this.photorollForm = this.fb.group({    // restting to a new form without saving
      'images': this.fb.array([])
    });
    
    if(!this.currentPhotoroll.images) return ;
    this.currentPhotoroll.images.forEach(ip => {
      let newPath = this.backend_uri + ip;
      const control = new FormControl(newPath);
      (<FormArray>this.photorollForm.get('images')).push(control);
    });
    console.log('CHANGE AFTER ::  \N', this.photorollForm, this.currentPhotoroll, this.allPhotorolls);
  }


  newPhotos: File[] = [];
  newImg: File = null;
  onImgAdded(files: FileList) {
    this.newImg = files.item(0);
    this.newPhotos.push(this.newImg);

    const control = new FormControl(this.newImg, [], [ImgMimeType]); 
    (<FormArray>this.photorollForm.get('images')).push(control);
    // //number of currently existing images --> get index of last added image
    let numImgs = this.photorollForm.get('images')['controls'].length; 
    numImgs = numImgs==0 ? 0 : numImgs-1;
    
    (<FormArray>this.photorollForm.get('images')).updateValueAndValidity();
    
    const reader = new FileReader();
    reader.onload = () => {
      (<HTMLImageElement>document.getElementById((numImgs).toString())).src = reader.result as string;
    }
    reader.readAsDataURL(this.newImg);
    
  }

  deleteImg(indx: number){
    (<FormArray>this.photorollForm.get('images')).removeAt(indx);
  }

  onSubmit(PhotorollForm: FormGroup) {
    // console.log('SUBMIT FORM  :: \n', this.photorollForm.value, this.currentPhotoroll, 
    //   this.allPhotorolls, this.newPhotos);
    
    let paths = [];
    this.currentPhotoroll.images = this.newPhotos;
    this.photorollForm.value.images.forEach(el => {
      if(typeof(el) == 'string'){
        paths.push(el)
      }
    });
    this.currentPhotoroll.paths = paths;
    console.log('NEW CURRENT PH :: \n', this.currentPhotoroll);


    this.photorollService.updatePhotoroll(this.currentPhotoroll)
    .subscribe(res => {
      this.currentPhotoroll = null;
      this.photorollForm.reset();
      //reset and remain here on re-route to another page?
      console.log('\nserver result :::\n', res);
    }, error => {
      this.errorService.ErrorCaught.next({ErrorMsg: error, Url: '/home'});
    });
    //handle error
  }

  onCancel(){
    this.currentPhotoroll = null;
    this.photorollForm.reset();
  }

}
