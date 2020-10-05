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

  // backgroundColor:string=' #fa6666';
  backgroundColor:string="#c2c2c2";
  photorollId = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // let x = this.router.getCurrentNavigation().extras.state;
    // console.log('FORMULA COMP PHiD::', x.photorollId);

  }

  ngOnInit(): void {
    // console.log('FORMULA ONINIT STATE HISTORY ::\n', history.state);
    
  }

}
