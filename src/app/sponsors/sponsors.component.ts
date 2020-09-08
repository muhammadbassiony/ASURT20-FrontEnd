import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sponsorsInfo = [
    {logo : "assets/img/قادر.png", name : "Arab Organization for Industrialization" , desc : 'KADER factory for developed industries was established in 1949 under the name of "HELIOPOLIS AIRCRAFT FACTORY" to produce the primary training Aircraft ..'},
    {logo : "assets/img/اليو.png", name : "ALUMISR", desc : "Alumisr company produces aluminum for the purposes of the various use with many finishes.It was established in 1977"},
    {logo : "assets/img/اعمار.png", name : "EMAR", desc : "Emaar Misr is one of the largest real estate companies in Egypt and the developer of iconic projects such as Uptown Cairo, Marassi, and Mivida"}
  ]

}
