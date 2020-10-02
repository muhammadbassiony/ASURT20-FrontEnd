import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  backgroundColor:string='#E5AC00';
  photorollId = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    // let x = this.router.getCurrentNavigation().extras.state;
    // console.log('SHELL COMP PHiD::', x);

  }

  ngOnInit(): void {
    // console.log('SHELL ONINIT STATE HISTORY ::\n', history.state);
  }

}
