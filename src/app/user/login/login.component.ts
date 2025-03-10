import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthenticationService} from '../../core/services/authentication.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {NgIf} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    NgIf,
    MatFormField,
    FormsModule,
    MatInput,
    MatLabel,
    MatDivider,
    MatButton,
    RouterOutlet
  ]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isLoggedIn: boolean;
  isError: boolean;
  roles: string[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.isError = false;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  checkLogin(): void {
    this.authenticationService.authenticate(this.username, this.password).subscribe(jwtResponse => {
       this.tokenStorageService.saveToken(jwtResponse.accessToken);
       this.tokenStorageService.saveUser(jwtResponse);
       this.isLoggedIn = true;
       this.isError = false;
       this.roles = this.tokenStorageService.getUser().roles;
       this.router.navigate(['']);
      },
      error => {
        this.isLoggedIn = false;
        this.isError = true;
      }
    );
  }

}
