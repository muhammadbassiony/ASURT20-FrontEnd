import { Component, OnInit, Input} from '@angular/core';
import { Award } from '../../models/award.model';

import { CompetitionsService } from '../../services/competitions.service';
import { ErrorService } from '../../../shared/errorModal/error.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-competition-awards',
  templateUrl: './competition-awards.component.html',
  styleUrls: ['./competition-awards.component.css'],
})
export class CompetitionAwardsComponent implements OnInit{

  // awards: Award[];
  // images: any;
  backend_uri = environment.backend_uri_static;
  
  @Input('compColor') compColor: string;
  @Input('awards') awards = null;

  constructor(
    private errorService: ErrorService,
    private competitionsService: CompetitionsService
  ) { }
  
  ngOnInit(): void {
    // for(let awId of this.awardIds){
    //   console.log('AWARDS ID :: ', awId);
    //   this.competitionsService.
    // }
    // if(this.awards) 
    console.log('RECEIVED AWARDSSSS :: \n', this.awards);
    for(let aw of this.awards){
      aw.img = this.backend_uri + aw.imagePath;
    }
    console.log('RECEIVED AWARDSSSS 222 :: \n', this.awards);
    
    // this.images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  
  }

  
}
