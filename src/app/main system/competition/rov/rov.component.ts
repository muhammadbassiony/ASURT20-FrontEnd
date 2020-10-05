import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rov',
  templateUrl: './rov.component.html',
  styleUrls: ['./rov.component.css']
})
export class RovComponent implements OnInit {

  backgroundColor:string='#177EE5';
  photorollId = "";
  competitionColor = '#800000';

  constructor() { }

  ngOnInit(): void {
  }

}
