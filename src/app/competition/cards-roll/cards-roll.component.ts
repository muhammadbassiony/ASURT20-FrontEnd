import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cards-roll',
  templateUrl: './cards-roll.component.html',
  styleUrls: ['./cards-roll.component.css']
})
export class CardsRollComponent implements OnInit {

  @Input('prizesPhotos') prizesPhotos=[];
  constructor() { }

  ngOnInit(): void {
  }

}
