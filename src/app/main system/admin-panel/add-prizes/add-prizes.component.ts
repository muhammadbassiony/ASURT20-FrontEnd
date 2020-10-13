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

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-prizes',
  templateUrl: './add-prizes.component.html',
  styleUrls: ['./add-prizes.component.css']
})
export class AddPrizesComponent implements OnInit {

  backend_uri = environment.backend_uri_static;

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
      // console.log('GOT ALL COMPS :: \n', this.allComps);
    });

    this.awardsForm = this.fb.group({
      'title': [ , [Validators.required, Validators.minLength(3)]],
      'description': [ , [Validators.required, Validators.minLength(5)]],
      'image': [ , [Validators.required, Validators.minLength(3)], ImgMimeType]
    });
  }

  onCompSelect(){
    // console.log('COMP CHANGE :: CURRENT COMP :: \n', this.currentComp);
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
    // console.log('DELETE AWARD :: INDX :: ', indx, this.currentComp, '\n',this.allComps);
    if(confirm('Are you sure you want to delete this award?')){
      this.competitionsService.deleteAward(
        this.currentComp.awards[indx]['_id'],
        this.currentComp._id
      ).subscribe(res => {
        alert('Award succesfully deleted!');
        this.currentComp.awards.splice(indx, 1);
      });
    }
    
  }

  onSubmit(awardsForm: FormGroup) {
    let newAward: Award = {
      title: this.awardsForm.value.title,
      description: this.awardsForm.value.description,
      awardImg: this.newImg
    };

    // console.log('AWARD EDIT : FROM :: \n', this.awardsForm);
    this.competitionsService.addNewAward(this.currentComp._id, newAward)
    .subscribe(res => {
      alert('Award added succesfully!');
      this.awardsForm.reset();
    });
    //add error handling here
  }

}
