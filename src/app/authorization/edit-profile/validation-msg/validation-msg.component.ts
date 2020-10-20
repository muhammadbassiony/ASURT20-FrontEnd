import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.css']
})
export class ValidationMsgComponent implements OnInit {

  constructor() { }
  @Input() inputFormControl: AbstractControl & FormControl;
  @Input() msg: string;
  ngOnInit(): void {
  }

}
