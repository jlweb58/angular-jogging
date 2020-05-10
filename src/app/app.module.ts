import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {ChartModule} from './chart/chart.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {ShoesModule} from './shoes/shoes.module';
import {RunModule} from './run/run.module';
import {UserModule} from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
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
    RunModule,
    SharedModule,
    ShoesModule,
    UserModule,
    MaterialModule
  ],
  exports: [
  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
