import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CompetitionComponent } from './competition/competition.component';
import { CompetitionInfoComponent } from './competition/competition-info/competition-info.component';
import { CompetitionAwardsComponent } from './competition/competition-awards/competition-awards.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionComponent,
    CompetitionInfoComponent,
    CompetitionAwardsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
