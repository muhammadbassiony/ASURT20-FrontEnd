import { Component, Input, OnInit } from '@angular/core';
import {FadeInService} from "../../fade-in.service";

@Component({
  selector: 'app-competition-paragraph',
  templateUrl: './competition-paragraph.component.html',
  styleUrls: ['./competition-paragraph.component.css']
})
export class CompetitionParagraphComponent implements OnInit {

  @Input('paragraph') paragraph:{'image':string,'info':string};
  @Input('inverted') inverted=false;
  constructor(private fadeInService: FadeInService) { }


  ngOnInit(): void {
    this.fadeInService.fadeIn();
  }

}
