import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import {DataStorageService} from "./admin-panel/add-prizes/data-storage.service";


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
    CompetitionParagraphComponent
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
  providers: [DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
