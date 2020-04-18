import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../services/logger.service';
import {ChangePasswordRequest} from '../models/change-password-request.model';
import {UserService} from '../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../helpers/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordRequest: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: '',
  };

  changePasswordForm: FormGroup;

  submitted: boolean;

  constructor(private logger: LoggerService, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    },
      {
         validator: MustMatch('newPassword', 'repeatNewPassword')
      });
  }

  // Easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  changePassword() {
    this.logger.log('Changing password');
    this.userService.changePassword(this.changePasswordRequest);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      this.logger.log("Invalid form!");
      return;
    }
    this.changePassword();
  }

}
