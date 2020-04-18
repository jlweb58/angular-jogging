import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RunTableComponent} from './run-table/run-table.component';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {MaterialModule} from './material.module';
import {LoggerService} from './services/logger.service';
import {ShoesDialogComponent } from './shoes-dialog/shoes-dialog.component';
import {ShoesListComponent} from './shoes-list/shoes-list.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {ChartDateRangeDialogComponent} from './chart-date-range-dialog/chart-date-range-dialog.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {errorInterceptorProviders} from './helpers/error.interceptor';
import {ChangePasswordComponent} from './change-password/change-password.component';
import { MonthDatePickerComponent } from './month-date-picker/month-date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    RunTableComponent,
    RunDialogComponent,
    ShoesDialogComponent,
    ShoesListComponent,
    ConfirmDialogComponent,
    BarChartComponent,
    ChartDateRangeDialogComponent,
    LoginComponent,
    LogoutComponent,
    ChangePasswordComponent,
    MonthDatePickerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MaterialModule
  ],
  exports: [
    RunDialogComponent,
    ConfirmDialogComponent
  ],
  providers: [
    LoggerService,
    authInterceptorProviders,
    errorInterceptorProviders,
    ],
  entryComponents: [
    RunDialogComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
