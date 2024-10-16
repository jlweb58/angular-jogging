import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthenticationService} from './services/authentication.service';
import {LoggerService} from './services/logger.service';
import {ActivityService} from './services/activity.service';
import {GearService} from './services/gear.service';
import {TokenStorageService} from './services/token-storage.service';
import {UserService} from './services/user.service';
import {authInterceptorProviders} from './interceptors/auth.interceptor';
import {errorInterceptorProviders} from './interceptors/error.interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {FileUploadService} from './services/file-upload.service';
import {GpxTrackService} from './services/gpx-track.service';
import {StorageService} from './services/storage.service';



@NgModule({ imports: [CommonModule], providers: [
        AuthGuardService,
        AuthenticationService,
        LoggerService,
        ActivityService,
        GearService,
        TokenStorageService,
        UserService,
        FileUploadService,
        GpxTrackService,
        StorageService,
        authInterceptorProviders,
        errorInterceptorProviders,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class CoreModule {}
