import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterResponseData, UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private usersService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  @Output() isLoading: boolean = false;
  @Output() error: string = null;

  password: string;
  confirmPassword: string;
  onSignUpSubmit(signUpForm: NgForm) {
    
    if (signUpForm.invalid) {
      return;
    }
    // const name = signUpForm.value.name;
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;

    this.isLoading = true;

    this.usersService.signUp(email, password)
    .subscribe(responseData => {
      // console.log('signup succes res :: \n', responseData);
      this.isLoading = false;
      // this.router.navigate(['edit-profile', responseData.user._id]);
      this.router.navigate(['edit-profile']);
    }, errorMessage => {
      console.log(errorMessage);
      this.isLoading = false;
      alert(errorMessage);
      this.error = errorMessage;
    });
    signUpForm.reset();
  }

}
