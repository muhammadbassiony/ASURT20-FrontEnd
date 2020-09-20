import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionComponent } from './competition/competition.component';
import { CompetitionAwardsComponent } from './competition/competition-awards/competition-awards.component';
import { HeaderComponent } from './header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompetitionsComponent } from './landing-page/competitions/competitions.component';
import { PhotoRollComponent } from './landing-page/photo-roll/photo-roll.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PhotorollEditComponent } from './admin-panel/photoroll-edit/photoroll-edit.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CompetitionEditComponent } from './admin-panel/competition-edit/competition-edit.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactiveFormsModule,  FormsModule} from '@angular/forms';

import { AddPrizesComponent } from './admin-panel/add-prizes/add-prizes.component';
import { CardsRollComponent } from './competition/cards-roll/cards-roll.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { SponsorsEditComponent } from './admin-panel/sponsors-edit/sponsors-edit.component';
import { ShellComponent } from './competition/shell/shell.component';
import { RovComponent } from './competition/rov/rov.component';
import { FormulaComponent } from './competition/formula/formula.component';
import { CompetitionParagraphComponent } from './competition/competition-paragraph/competition-paragraph.component';
import {PrizeService} from "./services/prize.service";
import { from } from 'rxjs';
import {CloseDirective} from "./admin-panel/close.directive";
import {FadeInService} from "./fade-in.service";
import { FooterComponent } from './footer/footer.component';
<<<<<<< HEAD
=======
import { RegistrationComponent } from './registration/registration.component';
import { SignUpComponent } from './registration/sign-up/sign-up.component';
import { SignInComponent } from './registration/sign-in/sign-in.component';
import {RegistrationService} from './registration/registration.service';
import {RegistrationInterceptorService} from './registration/registration-interceptor.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40


@NgModule({
  declarations: [
    AppComponent,
    CompetitionComponent,
    CompetitionAwardsComponent,
    HeaderComponent,

    CompetitionsComponent,
    PhotoRollComponent,
    LandingPageComponent,
    PhotorollEditComponent,


    AdminPanelComponent,
    CompetitionEditComponent,
    AddPrizesComponent,
    CardsRollComponent,
    SponsorsComponent,
    SponsorsEditComponent,
    ShellComponent,
    RovComponent,
    FormulaComponent,
    CompetitionParagraphComponent,
    CloseDirective,
    FooterComponent,
<<<<<<< HEAD
=======
    RegistrationComponent,
    SignUpComponent,
    SignInComponent,
    LoadingSpinnerComponent,
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
<<<<<<< HEAD
  providers: [PrizeService, FadeInService],
=======
  providers: [PrizeService, FadeInService, RegistrationService,
    {provide: HTTP_INTERCEPTORS, useClass: RegistrationInterceptorService, multi: true}],
>>>>>>> 0fbbb9b2d182fa8a9c48f20c176815d830cc6d40
  bootstrap: [AppComponent]
})
export class AppModule{ }
