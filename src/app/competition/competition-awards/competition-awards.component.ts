import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-awards',
  templateUrl: './competition-awards.component.html',
  styleUrls: ['./competition-awards.component.css'],
})
export class CompetitionAwardsComponent implements OnInit{
  awards=[1,2,3]
  constructor() { }
  
  ngOnInit(): void {}
}
