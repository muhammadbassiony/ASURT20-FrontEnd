import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rov',
  templateUrl: './rov.component.html',
  styleUrls: ['./rov.component.css']
})
export class RovComponent implements OnInit {

  photorollId = "";
  competitionColor = '#177EE5';

  constructor() { }

  ngOnInit(): void {
  }

}
