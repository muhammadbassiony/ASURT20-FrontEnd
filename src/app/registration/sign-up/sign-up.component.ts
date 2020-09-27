import {Component, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegisterResponseData, RegistrationService} from '../registration.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private registerService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
  }
  @Output() isLoading: boolean = false;
  @Output() error: string = null;

  password: string;
  confirmPassword: string;
  onSignUpSubmit(signUpForm: NgForm) {
    console.log(signUpForm);
    if (signUpForm.invalid) {
      return;
    }
    // const name = signUpForm.value.name;
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;


    let signUpObs: Observable<RegisterResponseData>;
    this.isLoading = true;

    this.registerService.signUp(email, password)
    .subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
      
    }, errorMessage => {
      console.log(errorMessage);
      this.isLoading = false;
      this.error = errorMessage;
    });
    signUpForm.reset();
  }

}
