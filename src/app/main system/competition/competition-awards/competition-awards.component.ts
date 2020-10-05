import { Component, OnInit, Input} from '@angular/core';
import { Award } from '../../models/award.model';
// import { AwardsService } from '../../services/award.service';

@Component({
  selector: 'app-competition-awards',
  templateUrl: './competition-awards.component.html',
  styleUrls: ['./competition-awards.component.css'],
})
export class CompetitionAwardsComponent implements OnInit{

  awards: Award[];
  images: any;
  // compColor = '#800000';
  @Input('compColor') compColor: string;

  constructor() { }
  
  ngOnInit(): void {
    // this.prizeService.getPrize(this.competitionName).toPromise()
    // .then(prizes=>{
    //   this.prizes=prizes;
    // })
    // .catch()
    // this.awards = this.awardsService.dummyPrizes;
    this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  }

  
}
