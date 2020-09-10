import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-sponsors-edit',
  templateUrl: './sponsors-edit.component.html',
  styleUrls: ['./sponsors-edit.component.css']
})
export class SponsorsEditComponent implements OnInit {

  sponsorEditForm : FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.sponsorEditForm = new FormGroup({
      'sponsorLogo' : new FormControl('', Validators.required),
      'sponsorName' : new FormControl('', Validators.required),
      'sponsorDesc' : new FormControl('', Validators.required)
    })
  }
  sponsorsInfo = [
    {logo : "assets/img/kader.png", name : "Arab Organization for Industrialization" , desc : 'KADER factory for developed industries was established in 1949 under the name of "HELIOPOLIS AIRCRAFT FACTORY" to produce the primary training Aircraft ..'},
    {logo : "assets/img/alumisr.png", name : "ALUMISR", desc : "Alumisr company produces aluminum for the purposes of the various use with many finishes.It was established in 1977"},
    {logo : "assets/img/emar.png", name : "EMAR", desc : "Emaar Misr is one of the largest real estate companies in Egypt and the developer of iconic projects such as Uptown Cairo, Marassi, and Mivida"}
  ]

}
