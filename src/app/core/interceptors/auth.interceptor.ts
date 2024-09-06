import { HTTP_INTERCEPTORS, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {LoggerService} from '../services/logger.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService, private logger: LoggerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.tokenStorageService.getToken();
    if (token != null) {
      const httpHeaders = new HttpHeaders({
        Authorization: 'Bearer ' + token
      });
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
