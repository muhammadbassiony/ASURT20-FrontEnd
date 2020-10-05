import { Component, OnInit, Input} from '@angular/core';
import { Prize } from '../../models/prize.model';
import { PrizeService } from '../../services/prize.service';

@Component({
  selector: 'app-competition-awards',
  templateUrl: './competition-awards.component.html',
  styleUrls: ['./competition-awards.component.css'],
})
export class CompetitionAwardsComponent implements OnInit{

  prizes:Prize[];
  @Input('competitionName') competitionName:string; //for the back end
  images: any;

  constructor(private prizeService:PrizeService) { }
  
  ngOnInit(): void {
    // this.prizeService.getPrize(this.competitionName).toPromise()
    // .then(prizes=>{
    //   this.prizes=prizes;
    // })
    // .catch()
    this.prizes=this.prizeService.dummyPrizes;
    this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  }

  
}
