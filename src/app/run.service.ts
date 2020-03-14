import {Injectable, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Run } from './models/run.model';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private serviceUrl = 'http://localhost:9000/jogging/runs';

  constructor(
    private http: HttpClient,
  ) { }

  getRuns(): Observable<Run[]> {
    alert('getting runs');
    return this.http.get<Run[]>(this.serviceUrl);
  }

}
