import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RunTableComponent} from './run-table/run-table.component';
import {RunDialogComponent} from './run-dialog/run-dialog.component';
import {MaterialModule} from './material.module';
import {LoggerService} from './services/logger.service';
import {ShoesDialogComponent } from './shoes-dialog/shoes-dialog.component';
import {ShoesListComponent} from './shoes-list/shoes-list.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {errorInterceptorProviders} from './helpers/error.interceptor';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MonthDatePickerComponent} from './month-date-picker/month-date-picker.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {YearDatePickerComponent} from './year-date-picker/year-date-picker.component';
import {ChartModule} from './chart/chart.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    RunTableComponent,
    RunDialogComponent,
    ShoesDialogComponent,
    ShoesListComponent,
    LoginComponent,
    LogoutComponent,
    ChangePasswordComponent,
    MonthDatePickerComponent,
    CalendarViewComponent,
    YearDatePickerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    RunDialogComponent,
  ],
  providers: [
    LoggerService,
    authInterceptorProviders,
    errorInterceptorProviders,
    ],
  entryComponents: [
    RunDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
