import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ChangePasswordComponent,
    LoginComponent,
    LogoutComponent,
  ],
  exports: [
    ChangePasswordComponent,
    LoginComponent,
    LogoutComponent,
  ],
})
export class UserModule {}
