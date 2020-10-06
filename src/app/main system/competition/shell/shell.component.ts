import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  
  photorollId = "";
  competitionColor = '#E5AC00';
  compId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    let x = this.router.getCurrentNavigation().extras.state;
    this.compId = x.compId;
    console.log('SHELL COMP PHiD::', this.compId);
  }

  ngOnInit(): void {
    // console.log('SHELL ONINIT STATE HISTORY ::\n', history.state);
  }

}
