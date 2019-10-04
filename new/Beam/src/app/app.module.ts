import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AgGridModule } from 'ag-grid-angular';
import { EnvServiceProvider } from '../env.service.provider';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { SettingsComponent } from './Components/Settings/settings/settings.component';
import { PositionsComponent } from './Components/Positions/positions/positions.component';
import { CurrentRouteComponent } from './Components/Current_Route/current-route/current-route.component';
import { HttpClientModule } from "@angular/common/http";
import { HistoryComponent } from './Components/history/history.component';
import { SubscriptionComponent } from './Components/Subscription/subscription/subscription.component';
import { ConnectionSettingsComponent } from './Components/connection_settings/connection-settings/connection-settings.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    PositionsComponent,
    CurrentRouteComponent,
    HistoryComponent,
    SubscriptionComponent,
    ConnectionSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FlashMessagesModule.forRoot(),
    AgGridModule.withComponents([
      CurrentRouteComponent,
      HistoryComponent
    ]),
    UiSwitchModule
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
