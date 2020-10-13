import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html',
  styleUrls: ['./validation-msg.component.css']
})
export class ValidationMsgComponent implements OnInit {

  constructor() { }
  @Input() formControl: AbstractControl;
  @Input() msg: string;
  ngOnInit(): void {
  }

}
