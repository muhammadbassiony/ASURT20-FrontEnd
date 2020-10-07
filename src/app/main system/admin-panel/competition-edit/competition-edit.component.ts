import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {CompetitionsService} from '../../services/competitions.service';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

  
  allComps: any;

  constructor(
    private competitionsService: CompetitionsService,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.competitionsService.getAllCompetitions()
    .subscribe(res => {
      this.allComps = res;
    });
  }

  updateComps(){
    console.log('MANAGE COMPS  ::\n', this.allComps);
  }
  
}
