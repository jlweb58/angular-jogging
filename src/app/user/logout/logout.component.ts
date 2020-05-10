import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../core/services/token-storage.service';

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
