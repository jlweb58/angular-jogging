import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    if (this.tokenStorageService.getUser()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
