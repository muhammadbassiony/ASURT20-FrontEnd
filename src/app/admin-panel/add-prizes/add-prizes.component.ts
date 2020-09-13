import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Prize} from "./prize.model";
import {DataStorageService} from "./data-storage.service";

@Component({
  selector: 'app-add-prizes',
  templateUrl: './add-prizes.component.html',
  styleUrls: ['./add-prizes.component.css']
})
export class AddPrizesComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }
  prize = new Prize('', '', '', '');
  prizeJSON = {};
  ngOnInit(): void {
  }

  onPrizeSubmit(form: NgForm) {
    this.prize.competitionName = form.control.value.competitionName;
    this.prize.title = form.control.value.prizeTitle;
    this.prize.description = form.control.value.prizeDescription;
    this.prize.imagePrize = form.control.value.prizeImgPath;
    console.log(this.prize);
    this.prizeJSON = JSON.stringify(this.prize);
    console.log(this.prizeJSON);
    this.dataStorageService.storePrize(this.prizeJSON);
    console.log(form);
  }
}
