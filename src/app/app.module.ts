import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {CalendarViewComponent} from './calendar-view/calendar-view.component';
import {ChartModule} from './chart/chart.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {GearModule} from './gear/gear.module';
import {ActivityModule} from './activity/activity.module';
import {UserModule} from './user/user.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CalendarViewComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    CoreModule,
    ActivityModule,
    SharedModule,
    GearModule,
    UserModule,
    MaterialModule,
  ],
  exports: [
  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
