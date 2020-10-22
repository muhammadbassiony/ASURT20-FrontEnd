import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from "@angular/common";
import { catchError } from 'rxjs/operators';
import { Competition } from '../../models/competition.model';
import {CompetitionsService} from '../../services/competitions.service';

import { ErrorService } from '../../../shared/errorModal/error.service';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {


  // allComps: Competition[];
  allComps: any;

  constructor(
    private errorService: ErrorService,
    private competitionsService: CompetitionsService,
    public route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.competitionsService.getAllCompetitions()
    .subscribe(res => {
      this.allComps = res;
    }, error => {
      this.errorService.ErrorCaught.next({ErrorMsg: error, Url: '/home'});
    });
  }

  updateComps(){
    // console.log('MANAGE COMPS  ::\n', this.allComps);
    for(let cmp of this.allComps){
      this.competitionsService.updateCompetition(cmp._id, cmp)
      .subscribe(res => {
        // console.log('SUCCESS COMP UPDATED :: ', cmp.name);
      }, error => {
        this.errorService.ErrorCaught.next({ErrorMsg: error, Url: '/home'});
      });
    }
  }
  goBack() {
    this.location.back();
  }

}
