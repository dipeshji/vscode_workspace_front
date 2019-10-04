import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { SettingsComponent } from './Components/Settings/settings/settings.component';
import { PositionsComponent } from './Components/Positions/positions/positions.component';
import { CurrentRouteComponent } from './Components/Current_Route/current-route/current-route.component';
import { HistoryComponent } from './Components/history/history.component'
import { SubscriptionComponent } from './Components/Subscription/subscription/subscription.component';
import { ConnectionSettingsComponent } from './Components/connection_settings/connection-settings/connection-settings.component'
import { GPSGuard } from './Guards/GPS_Guard/gps.guard'
import { RouteGuard } from './Guards/Route_Guard/route.guard'

const routes: Routes = [
  {path: '', component:SubscriptionComponent},
  {path: 'subscribe', component:SubscriptionComponent},
  {path: 'home', component:HomeComponent},
  {path: 'setting', component:SettingsComponent},
  {path: 'positions', component:PositionsComponent,canActivate: [GPSGuard]},
  {path: 'current', component:CurrentRouteComponent,canActivate: [RouteGuard]},
  {path: 'history', component:HistoryComponent, canActivate: [RouteGuard]},
  {path: 'connection_settings', component:ConnectionSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
