import { Component, OnInit } from '@angular/core';
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

import { Award } from "../../models/award.model";
import { Competition } from '../../models/competition.model';
import { CompetitionsService } from '../../services/competitions.service';

@Component({
  selector: 'app-add-prizes',
  templateUrl: './add-prizes.component.html',
  styleUrls: ['./add-prizes.component.css']
})
export class AddPrizesComponent implements OnInit {

  // THIS APPROACH SHOULD BE CHANGED LATER
  backend_uri = 'http://localhost:3000/';

  selectedImg: File = null;
  allComps: any;
  currentComp: Competition;
  awardsForm: FormGroup;

  constructor(
    private competitionsService: CompetitionsService,
    private fb: FormBuilder,
    public route: ActivatedRoute
  ) { }
  

  ngOnInit(): void {
    this.competitionsService.getAllCompetitionsPopulated()
    .subscribe(res => {
      this.allComps = res;
      console.log('GOT ALL COMPS :: \n', this.allComps);
    });

    this.awardsForm = this.fb.group({
      'title': [ , [Validators.required, Validators.minLength(3)]],
      'description': [ , [Validators.required, Validators.minLength(5)]],
      'image': [ , [Validators.required, Validators.minLength(3)], ImgMimeType]
    });
  }

  onCompSelect(){
    console.log('COMP CHANGE :: CURRENT COMP :: \n', this.currentComp);
    this.currentComp.awards.forEach(aw => {
      let im = this.backend_uri + aw['imagePath'];
      aw['path'] = im;
    })
  }

  newImg: File = null;
  onImgUploaded(files: FileList) {
    this.newImg = files.item(0);
    console.log(this.newImg);
  }

  deleteAward(indx: number){
    console.log('DELETE AWARD :: INDX :: ', indx, this.currentComp);
    this.currentComp.awards.splice(indx);
    console.log('DELETE AWARD :: AFTER :: ', this.currentComp);
  }

  onSubmit(awardsForm: FormGroup) {
    // const formData = new FormData();
    // formData.append('competitionName', form.control.value.competitionName);
    // formData.append('title', form.control.value.prizeTitle);
    // formData.append('description', form.control.value.prizeDescription);
    // formData.append('imagePrize', this.selectedImg, this.selectedImg.name);

    console.log('AWARD EDIT : FROM :: \n', this.awardsForm);
    // this.awardsService.storePrize(formData).toPromise()
    // .then(result=>{
    //   console.log(result)
    // }); 
  }

}
