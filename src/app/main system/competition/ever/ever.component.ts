import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-ever',
  templateUrl: './ever.component.html',
  styleUrls: ['./ever.component.css']
})
export class EverComponent implements OnInit {

  competitionColor = '#158000'; //ever accent color
  photorollId = "";
  compId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    let x = this.router.getCurrentNavigation().extras.state;
    this.compId = x.compId;
    console.log('EVER COMP PHiD::', this.compId);
  }

  ngOnInit(): void {
  }

}
