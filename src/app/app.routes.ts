import {Routes} from '@angular/router';
import {LoginComponent} from './user/login/login.component';
import {ActivityTableComponent} from './activity/activity-table/activity-table.component';
import {AuthGuardService} from './core/services/auth-guard.service';
import {ActivityViewComponent} from './activity/activity-view/activity-view.component';
import {GearListComponent} from './gear/gear-list/gear-list.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {LogoutComponent} from './user/logout/logout.component';
import {ChangePasswordComponent} from './user/change-password/change-password.component';


export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: ActivityTableComponent, canActivate: [AuthGuardService]},
  {path: 'activity', component: ActivityViewComponent, canActivate: [AuthGuardService]},
  {path: 'gear', component: GearListComponent, canActivate: [AuthGuardService]},
  {path: 'calendar', component: CalendarViewComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},

];
