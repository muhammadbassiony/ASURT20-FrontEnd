import { Component, OnInit } from '@angular/core';
import {FadeInService} from "../../shared/fade-in.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private fadeInService: FadeInService) { }

  ngOnInit(): void {
    this.fadeInService.fadeIn();
  }

}
