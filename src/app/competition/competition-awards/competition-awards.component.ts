import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-competition-awards',
  templateUrl: './competition-awards.component.html',
  styleUrls: ['./competition-awards.component.css'],
})
export class CompetitionAwardsComponent implements OnInit,OnDestroy{

  subs:Subscription;


  awards=[1,2,3]
  competitionName:string;
  constructor(private activeRoute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.subs = this.activeRoute.params.subscribe((params:Params)=>{
      this.competitionName=params['competitonName'];
    })
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
