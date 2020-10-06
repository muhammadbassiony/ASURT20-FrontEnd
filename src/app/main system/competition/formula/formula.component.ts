import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css']
})
export class FormulaComponent implements OnInit {

  competitionColor = '#800000'; //formula accent color
  photorollId = "";
  compId: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    let x = this.router.getCurrentNavigation().extras.state;
    this.compId = x.compId;
    console.log('FORMULA COMP PHiD::', this.compId);
  }

  ngOnInit(): void {
    // console.log('FORMULA ONINIT STATE HISTORY ::\n', history.state);
    
  }

}
