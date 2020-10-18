import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  isLoading = false;
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
    this.usersService.requestPasswordReset(this.RequestResetForm.value.email)
    .subscribe(res => {
      console.log('RES HEREE BRUB ')
      this.successMessage = 'Email Sent! please check your email!';
    }, error => {
      this.errorMessage = 'We have encountered a problem! Please try again!'
    })
  }


  

}
