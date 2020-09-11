import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-competition-awards',
  templateUrl: './competition-awards.component.html',
  styleUrls: ['./competition-awards.component.css'],
})
export class CompetitionAwardsComponent implements OnInit{

  awards=[1,2,3] //from the back end
  @Input('competitionName') competitionName:string; //for the back end


  constructor() { }
  
  ngOnInit(): void {
    
  }

  
}
