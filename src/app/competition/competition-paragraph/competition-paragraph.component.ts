import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-paragraph',
  templateUrl: './competition-paragraph.component.html',
  styleUrls: ['./competition-paragraph.component.css']
})
export class CompetitionParagraphComponent implements OnInit {

  @Input('paragraph') paragraph:{'image':string,'info':string};
  @Input('inverted') inverted=false;
  constructor() { }


  ngOnInit(): void {
  }

}
