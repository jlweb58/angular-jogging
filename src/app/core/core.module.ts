import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {LoggerService} from './services/logger.service';
import {RunService} from './services/run.service';
import {ShoesService} from './services/shoes.service';
import {TokenStorageService} from './services/token-storage.service';
import {UserService} from './services/user.service';



@NgModule({
  imports: [
    CommonModule,
    ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    LoggerService,
    RunService,
    ShoesService,
    TokenStorageService,
    UserService,
  ],
})
export class CoreModule {}
