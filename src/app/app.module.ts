import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CompetitionComponent } from './competition/competition.component';
import { CompetitionInfoComponent } from './competition/competition-info/competition-info.component';
import { CompetitionAwardsComponent } from './competition/competition-awards/competition-awards.component';
import { HeaderComponent } from './header/header.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CompetitionEditComponent } from './admin-panel/competition-edit/competition-edit.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CompetitionComponent,
    CompetitionInfoComponent,
    CompetitionAwardsComponent,
    HeaderComponent,
    AdminPanelComponent,
    CompetitionEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
