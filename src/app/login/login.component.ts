import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user.model';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isLoggedIn: boolean;
  roles: string[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

  checkLogin(): void {
    this.authenticationService.authenticate(this.username, this.password).subscribe(jwtResponse => {
       this.tokenStorageService.saveToken(jwtResponse.accessToken);
       this.tokenStorageService.saveUser(jwtResponse);
       this.isLoggedIn = true;
       this.roles = this.tokenStorageService.getUser().roles;
       this.router.navigate(['']);
      },
      error => {
        this.isLoggedIn = false;
      }
    );
  }

}
