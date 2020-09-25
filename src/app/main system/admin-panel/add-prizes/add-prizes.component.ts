import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Prize } from "../../models/prize.model";
import { PrizeService } from "../../services/prize.service";

@Component({
  selector: 'app-add-prizes',
  templateUrl: './add-prizes.component.html',
  styleUrls: ['./add-prizes.component.css']
})
export class AddPrizesComponent implements OnInit {

  selectedImg: File = null;

  constructor(private prizeService: PrizeService) { }
  

  ngOnInit(): void {
    
  }

  onImgUploaded(event) {
    this.selectedImg = <File>event.target.files[0];
    console.log(this.selectedImg)
  }

  onPrizeSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('competitionName', form.control.value.competitionName);
    formData.append('title', form.control.value.prizeTitle);
    formData.append('description', form.control.value.prizeDescription);
    formData.append('imagePrize', this.selectedImg, this.selectedImg.name);
    this.prizeService.storePrize(formData).toPromise()
    .then(result=>{
      console.log(result)
    });
  }

}
