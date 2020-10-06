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
      'title': [],
      'description': [],
      'image': []
    });
  }

  onCompSelect(){
    console.log('COMP CHANGE :: CURRENT COMP :: \n', this.currentComp);
    this.currentComp.awards.forEach(aw => {
      console.log('AW BACKEND BEFORE :: \n', aw);
      let im = this.backend_uri + aw['imagePath'];
      aw['path'] = im;
      console.log('AW BACKEND AFTER :: \n', aw);
    })
  }

  onImgUploaded(event) {
    this.selectedImg = <File>event.target.files[0];
    console.log(this.selectedImg)
  }

  deleteAward(indx: number){

  }

  onPrizeSubmit(awardsForm: FormGroup) {
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
