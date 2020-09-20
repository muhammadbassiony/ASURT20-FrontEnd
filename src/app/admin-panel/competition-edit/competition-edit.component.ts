import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addCompetition = false;
  competitions: string[] = ['Formula', 'Shell', 'ROV'];
<<<<<<< HEAD
=======
  
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
  onSubmit(form:NgForm) {
    console.log(form);
  }
}
