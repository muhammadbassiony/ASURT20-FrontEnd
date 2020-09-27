import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule,  FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';

import { CompetitionComponent } from './main system/competition/competition.component';
import { CompetitionAwardsComponent } from './main system/competition/competition-awards/competition-awards.component';
import { CompetitionsComponent } from './main system/landing-page/competitions/competitions.component';
import { PhotoRollComponent } from './main system/landing-page/photo-roll/photo-roll.component';
import { LandingPageComponent } from './main system/landing-page/landing-page.component';
import { PhotorollEditComponent } from './main system/admin-panel/photoroll-edit/photoroll-edit.component';
import { AdminPanelComponent } from './main system/admin-panel/admin-panel.component';
import { CompetitionEditComponent } from './main system/admin-panel/competition-edit/competition-edit.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { AddPrizesComponent } from './main system/admin-panel/add-prizes/add-prizes.component';
import { CardsRollComponent } from './main system/competition/cards-roll/cards-roll.component';
import { SponsorsComponent } from './main system/sponsors/sponsors.component';
import { SponsorsEditComponent } from './main system/admin-panel/sponsors-edit/sponsors-edit.component';
import { ShellComponent } from './main system/competition/shell/shell.component';
import { RovComponent } from './main system/competition/rov/rov.component';
import { FormulaComponent } from './main system/competition/formula/formula.component';
import { CompetitionParagraphComponent } from './main system/competition/competition-paragraph/competition-paragraph.component';


import { CloseDirective } from "./main system/admin-panel/close.directive";
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './registration/sign-up/sign-up.component';
import { SignInComponent } from './registration/sign-in/sign-in.component';
import { RegistrationService } from './registration/registration.service';
import { RegistrationInterceptorService } from './registration/registration-interceptor.service';
import { PhotoRollFetcherService } from './main system/services/photo-roll-fetcher.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AboutUsComponent } from './main system/about-us/about-us.component';

import { FadeInService } from "./shared/fade-in.service";
import { PrizeService } from "./main system/services/prize.service";
import {AdminGuardService} from './registration/admin-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';


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
    AboutUsComponent,
    CardsRollComponent,
    SponsorsComponent,
    SponsorsEditComponent,
    ShellComponent,
    RovComponent,
    FormulaComponent,
    CompetitionParagraphComponent,
    CloseDirective,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    LoadingSpinnerComponent,
    DashboardComponent,
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
  providers: [
    PrizeService,
    FadeInService,
    RegistrationService,
    PhotoRollFetcherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RegistrationInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
