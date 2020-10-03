import "@angular/compiler";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule,  FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

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
import { SignUpComponent } from './authorization/sign-up/sign-up.component';
import { SignInComponent } from './authorization/sign-in/sign-in.component';
import { UserService } from './authorization/user.service';
import { EditProfileComponent } from './authorization/edit-profile/edit-profile.component';
import { AuthInterceptorService } from './authorization/auth-interceptor.service';

import { PhotoRollFetcherService } from './main system/services/photo-roll-fetcher.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AboutUsComponent } from './main system/about-us/about-us.component';

import { FadeInService } from "./shared/fade-in.service";
import { PrizeService } from "./main system/services/prize.service";
import { AdminGuardService } from './authorization/admin-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PdfViewerModule }  from  'ng2-pdf-viewer';
import { MatListModule } from'@angular/material/list'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { UserApplicationComponent } from './recruitment system/applications/user-application/user-application.component';
import { NewEventComponent } from './recruitment system/applications/start-application/new-event/new-event.component';
import { SetQuestionsComponent } from './recruitment system/applications/start-application/set-questions/set-questions.component';
import { ViewSingleAppComponent } from './recruitment system/applications/view-applications/view-single-app/view-single-app.component';
import { ViewAllAppsComponent } from './recruitment system/applications/view-applications/view-all-apps/view-all-apps.component';
import { ViewAllUsersComponent } from './recruitment system/users/view-all-users/view-all-users.component';
import { UserEventsComponent } from './recruitment system/dashboard/user-events/user-events.component';
import { AdminEventsComponent } from './recruitment system/dashboard/admin-events/admin-events.component';
import { ViewSingleUserComponent } from './recruitment system/users/view-single-user/view-single-user.component';

import { UserInterviewsComponent } from './recruitment system/interviews/user-interviews/user-interviews.component';
import { AdminInterviewsComponent } from './recruitment system/interviews/admin-interviews/admin-interviews.component';
import { ViewInterviewComponent } from './recruitment system/interviews/admin-interviews/view-interview/view-interview.component';





FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);


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

    UserApplicationComponent,
    HeaderComponent,
    NewEventComponent,
    SetQuestionsComponent,
    ViewSingleAppComponent,
    ViewAllAppsComponent,
    ViewAllUsersComponent,
    UserEventsComponent,
    AdminEventsComponent,
    ViewSingleUserComponent,
    UserInterviewsComponent,
    AdminInterviewsComponent,
    ViewInterviewComponent,
    EditProfileComponent
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
    FormsModule,
    BrowserModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    AppRoutingModule,
    PdfViewerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FullCalendarModule,
    NgbModule,
    HttpClientModule,
    RouterModule

  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    PrizeService,
    FadeInService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
