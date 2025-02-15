import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(msg: any) {
    console.log(new Date().toLocaleTimeString() + ': ' + JSON.stringify(msg));
  }

  error(msg: any, error: any) {
    console.error(msg, error);
  }
}
