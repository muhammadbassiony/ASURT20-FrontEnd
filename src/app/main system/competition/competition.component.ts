import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // console.log('COMP MAIN PHiD::', this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    
  }

  

}
