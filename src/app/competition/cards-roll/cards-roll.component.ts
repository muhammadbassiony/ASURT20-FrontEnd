import { Component, OnInit, Input } from '@angular/core';
import { Prize } from 'src/app/models/prize.model';

@Component({
  selector: 'app-cards-roll',
  templateUrl: './cards-roll.component.html',
  styleUrls: ['./cards-roll.component.css']
})
export class CardsRollComponent implements OnInit {

  @Input('prizesPhotos') prizesPhotos:Prize[];
  constructor() { }

  ngOnInit(): void {
  }

}
