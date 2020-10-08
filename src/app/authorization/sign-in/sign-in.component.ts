import {Component, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterResponseData, UserService} from '../user.service';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { ErrorService } from 'src/app/errorModal/error.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private usersService: UserService, private router: Router, private ErrService:ErrorService) { }

  ngOnInit(): void {
  }

  @Output() isLoading: boolean = false;
  @Output() error: string = null;

  onSignInSubmit(signInForm: NgForm) {
    // console.log(signInForm.value);
    if (signInForm.invalid) {
      return;
    }
    const email = signInForm.value.email;
    const password = signInForm.value.password;

    this.isLoading = true;

    this.usersService.signIn(email, password)
    .subscribe(responseData => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
        
    }, errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
        alert('login insuccesful!');
    });
    signInForm.reset();
  }
}
