import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import {FadeInService} from "../../fade-in.service";
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40

@Component({
  selector: 'app-competition-paragraph',
  templateUrl: './competition-paragraph.component.html',
  styleUrls: ['./competition-paragraph.component.css']
})
export class CompetitionParagraphComponent implements OnInit {

  @Input('paragraph') paragraph:{'image':string,'info':string};
  @Input('inverted') inverted=false;
<<<<<<< HEAD
  constructor() { }


  ngOnInit(): void {
=======
  constructor(private fadeInService: FadeInService) { }


  ngOnInit(): void {
    this.fadeInService.fadeIn();
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
  }

}
