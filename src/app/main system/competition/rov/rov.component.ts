import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data, NavigationStart, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-rov',
  templateUrl: './rov.component.html',
  styleUrls: ['./rov.component.css']
})
export class RovComponent implements OnInit {

  photorollId = "";
  competitionColor = '#177EE5';
  compId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    let x = this.router.getCurrentNavigation().extras.state;
    this.compId = x.compId;
    console.log('ROV COMP PHiD::', this.compId);
  }

  
  ngOnInit(): void {
  }

}
