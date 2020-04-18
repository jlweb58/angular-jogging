import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
    selector: 'app-logout',
    template: '',
  }
)
export class LogoutComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tokenStorageService.logout();
    this.router.navigate(['login']);
  }

}
