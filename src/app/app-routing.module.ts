import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GearListComponent} from './gear/gear-list/gear-list.component';
import {ActivityTableComponent} from './activity/activity-table/activity-table.component';
import {LoginComponent} from './user/login/login.component';
import {LogoutComponent} from './user/logout/logout.component';
import {AuthGuardService} from './core/services/auth-guard.service';
import {ChangePasswordComponent} from './user/change-password/change-password.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {ActivityViewComponent} from './activity/activity-view/activity-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: ActivityTableComponent, canActivate: [AuthGuardService]},
  {path: 'activity', component: ActivityViewComponent, canActivate: [AuthGuardService]},
  {path: 'gear', component: GearListComponent, canActivate: [AuthGuardService]},
  {path: 'calendar', component: CalendarViewComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
