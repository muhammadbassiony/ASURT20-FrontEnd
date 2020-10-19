import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';


import { CompetitionsService } from '../../services/competitions.service';
import { ErrorService } from '../../../shared/errorModal/error.service';
import { Competition } from '../../models/competition.model';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  competitionColor = '#E5AC00';
  photorollId = null;
  compId: string;
  comp: Competition;
  awards = null;

  constructor(
    private errorService: ErrorService,
    private competitionsService: CompetitionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let x = this.router.getCurrentNavigation().extras.state;
    if (!x) {
      this.router.navigate(['/home']);
    }
    this.compId = x.compId;
  }

  ngOnInit(): void {
    this.competitionsService.getCompetition(this.compId)
    .subscribe(res => {
      this.comp = res;
      this.awards = this.comp.awards;
      this.photorollId = this.comp.photoroll;
    }, error => {
      this.errorService.ErrorCaught.next({ErrorMsg: error.message, Url: '/home'});
    });
  }

}
