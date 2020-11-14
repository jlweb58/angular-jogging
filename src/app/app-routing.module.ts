import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShoesListComponent} from './shoes/shoes-list/shoes-list.component';
import {RunTableComponent} from './run/run-table/run-table.component';
import {LoginComponent} from './user/login/login.component';
import {LogoutComponent} from './user/logout/logout.component';
import {AuthGuardService} from './core/services/auth-guard.service';
import {ChangePasswordComponent} from './user/change-password/change-password.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {RunViewComponent} from './run/run-view/run-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: RunTableComponent, canActivate: [AuthGuardService]},
  {path: 'run', component: RunViewComponent, canActivate: [AuthGuardService]},
  {path: 'shoes', component: ShoesListComponent, canActivate: [AuthGuardService]},
  {path: 'calendar', component: CalendarViewComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
