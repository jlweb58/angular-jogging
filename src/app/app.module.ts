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
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {ChartModule} from './chart/chart.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {ShoesModule} from './shoes/shoes.module';

@NgModule({
  declarations: [
    AppComponent,
    RunTableComponent,
    RunDialogComponent,
    LoginComponent,
    LogoutComponent,
    ChangePasswordComponent,
    CalendarViewComponent,
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
    CoreModule,
    SharedModule,
    ShoesModule,
    MaterialModule
  ],
  exports: [
    RunDialogComponent,
  ],
  providers: [
    ],
  entryComponents: [
    RunDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
