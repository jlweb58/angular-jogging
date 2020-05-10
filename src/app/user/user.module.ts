import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password/change-password.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ChangePasswordComponent,
  ],
  exports: [
    ChangePasswordComponent,
  ],
})
export class UserModule {}
