import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Competition } from '../competition.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-competition-info',
  templateUrl: './competition-info.component.html',
  styleUrls: ['./competition-info.component.css']
})
export class CompetitionInfoComponent implements OnInit,OnDestroy {

  subs:Subscription;

  competitionName: string;
  index: number;
  competitionsData = [
    new Competition('Formula',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lorem volutpat, euismod lectus sed, convallis magna. Donec quis diam sit amet magna finibus condimentum non nec purus. Sed volutpat dui mauris, vehicula pretium sem venenatis vitae. Aenean ac eros nulla. Integer mollis erat vitae vehicula faucibus. Curabitur vel lorem a lorem interdum feugiat nec ac dui. Duis placerat risus id nunc sodales volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      'https://images.unsplash.com/photo-1541769740-098e80269166?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9',
      'assets/img/FormulaStudentUK.png'
    ),
    new Competition('Shell',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lorem volutpat, euismod lectus sed, convallis magna. Donec quis diam sit amet magna finibus condimentum non nec purus. Sed volutpat dui mauris, vehicula pretium sem venenatis vitae. Aenean ac eros nulla. Integer mollis erat vitae vehicula faucibus. Curabitur vel lorem a lorem interdum feugiat nec ac dui. Duis placerat risus id nunc sodales volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      'assets/img/Shell.png',
      'assets/img/Shell.png'
    ),
    new Competition('ROV',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis lorem volutpat, euismod lectus sed, convallis magna. Donec quis diam sit amet magna finibus condimentum non nec purus. Sed volutpat dui mauris, vehicula pretium sem venenatis vitae. Aenean ac eros nulla. Integer mollis erat vitae vehicula faucibus. Curabitur vel lorem a lorem interdum feugiat nec ac dui. Duis placerat risus id nunc sodales volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
      'assets/img/ROV.png',
      'assets/img/ROV.png'
    ),
  ]
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs=this.activeRoute.params.subscribe((params: Params) => {
      this.competitionName = params['competitionName'];
      console.log(this.competitionName);
      switch (this.competitionName) {
        case 'formula':
          this.index = 0;
          break;
        case 'shell':
          this.index = 1;
          break;
        case 'rov':
          this.index = 2;
          break;
        default:
          this.index = 0;
          break;
      }
      console.log(this.index)
    })

  }
  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
