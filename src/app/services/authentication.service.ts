import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoggerService} from './logger.service';
import {User} from '../models/user.model';
import {JwtResponse} from '../models/jwt-response.model';
import {LoginRequest} from '../models/login-request.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private serviceUrl = 'http://localhost:9000/jogging/login';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  authenticate(username, password): Observable<any> {
    const loginRequest: LoginRequest = new LoginRequest(username, password);
    return this.http.post<JwtResponse>(this.serviceUrl, loginRequest);
  }
}
