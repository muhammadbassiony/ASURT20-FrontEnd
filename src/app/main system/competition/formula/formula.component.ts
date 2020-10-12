import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


import { CompetitionsService } from '../../services/competitions.service';
import { ErrorService } from '../../../shared/errorModal/error.service';
import { Competition } from '../../models/competition.model';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {

  competitionColor = '#800000'; //formula accent color
  photorollId = null;
  compId: string;
  comp: Competition;


  constructor(
    private errorService: ErrorService,
    private competitionsService: CompetitionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let x = this.router.getCurrentNavigation().extras.state;
    this.compId = x.compId;
  }

  ngOnInit(): void {
    this.competitionsService.getCompetition(this.compId)
    .subscribe(res => {
      this.comp = res;
      this.photorollId = this.comp.photoroll;
    }, error => {
      this.errorService.ErrorCaught.next({ErrorMsg: error.message, Url: '/home'});
    });
    
  }

}
