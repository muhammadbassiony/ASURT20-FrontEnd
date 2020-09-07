import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-roll',
  templateUrl: './cards-roll.component.html',
  styleUrls: ['./cards-roll.component.css']
})
export class CardsRollComponent implements OnInit {

  prizesPhotos=[1,2,3];
  constructor() { }

  ngOnInit(): void {
  }

}
