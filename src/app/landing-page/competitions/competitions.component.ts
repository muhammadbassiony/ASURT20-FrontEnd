import { Component, OnInit } from '@angular/core';
import {FadeInService} from "../../fade-in.service";

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  constructor(private fadeInService: FadeInService) { }

  ngOnInit(): void {
    this.fadeInService.fadeIn();
  }

}
