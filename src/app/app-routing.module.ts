import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoesListComponent} from './shoes-list/shoes-list.component';
import {RunTableComponent} from './run-table/run-table.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: RunTableComponent, canActivate: [AuthGuardService]},
  {path: 'shoes', component: ShoesListComponent, canActivate: [AuthGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
