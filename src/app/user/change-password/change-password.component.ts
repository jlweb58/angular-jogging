import {Component, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {ChangePasswordRequest} from '../../core/models/change-password-request.model';
import {UserService} from '../../core/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../shared/validators/must-match.validator';
import {Location} from '@angular/common';

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

  constructor(private logger: LoggerService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private location: Location) { }

  changePasswordForm: FormGroup;

  submitted: boolean;



  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      });
  }

  // Easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  changePassword() {
    this.logger.log('Changing password');
    this.changePasswordRequest = {
      oldPassword: this.f.oldPassword.value,
      newPassword: this.f.newPassword.value
    };
    this.userService.changePassword(this.changePasswordRequest);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      this.logger.log('Invalid form!');
      return;
    }
    this.changePassword();
    this.location.back();
  }

  cancel() {
    this.location.back();
  }

}
