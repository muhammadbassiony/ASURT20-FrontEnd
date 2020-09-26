import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CompetitionsService} from '../../services/competitions.service';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

  constructor(private competitionsService: CompetitionsService) { }

  ngOnInit(): void {
    // THE FOLLOWING CODE CAUSES ERROR AS THE BACKEND DOES NOT CONTAIN ANY COMPETITIONS
    // this.competitionsService.getAllCompetitions().subscribe(
    //   (successResponse) => {
    //     this.competitions.splice(0, this.competitions.length);
    //     this.isChecked.splice(0, this.isChecked.length);
    //     const gottenCompetitions = successResponse.competitions;
    //     for (let i = 0; i < gottenCompetitions.length; i++) {
    //       this.competitions.push(gottenCompetitions[i].name);
    //       this.isChecked[i] = gottenCompetitions[i].visible;
    //     }
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
  }

  addCompetition = false;
  competitions: string[] = ['Formula', 'Shell', 'ROV'];
  isChecked: boolean[] = [];
  onSubmit(form: NgForm) {
    this.competitionsService.changeCompetitionVisibility(this.isChecked);
    console.log(form.value.Formula);
  }
}
