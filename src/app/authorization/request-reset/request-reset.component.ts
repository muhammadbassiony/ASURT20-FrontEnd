import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  email: string;
  RequestResetForm: FormGroup;
  errorMessage: string = null;
  successMessage: string = null;

  constructor(
    private usersService: UserService
  ) { }

  ngOnInit(): void {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });

  }

  RequestResetUser(RequestResetForm: FormGroup){
    console.log('PASS RESET REQUEST FORM :: \n', this.RequestResetForm);
  }

}
