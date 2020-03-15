import {Injectable, OnInit} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Run } from './models/run.model';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private serviceUrl = 'http://localhost:9000/jogging/runs';
  // tslint:disable-next-line:variable-name
  private _runs = new BehaviorSubject<Run[]>([]);
  private dataStore: { runs: Run[] } = { runs: [] }; // store our data in memory
  readonly runs = this._runs.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  loadAll() {
    this.http.get(this.serviceUrl).subscribe(
      data => {
        // @ts-ignore
        this.dataStore.runs = data;
        this._runs.next(Object.assign({}, this.dataStore).runs);
      },
      error => console.log('Could not load runs.')
    );
  }

  load(id: number | string) {
    this.http.get<Run>(`${this.serviceUrl}/${id}`).subscribe(
      data => {
        let notFound = true;

        this.dataStore.runs.forEach((item, index) => {
          if (item.id === data.id) {
            this.dataStore.runs[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.runs.push(data);
        }

        this._runs.next(Object.assign({}, this.dataStore).runs);
      },
      error => console.log('Could not load run.')
    );
  }

  create(run: Run) {
    this.http
      .post<Run>(this.serviceUrl, JSON.stringify(run))
      .subscribe(
        data => {
          this.dataStore.runs.push(data);
          this._runs.next(Object.assign({}, this.dataStore).runs);
        },
        error => console.log('Could not create todo.')
      );
  }

  update(run: Run) {
    this.http
      .put<Run>(`${this.serviceUrl}/${run.id}`, JSON.stringify(run))
      .subscribe(
        data => {
          this.dataStore.runs.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.runs[i] = data;
            }
          });

          this._runs.next(Object.assign({}, this.dataStore).runs);
        },
        error => console.log('Could not update run.')
      );
  }

  getRuns(): Observable<Run[]> {
    return this.http.get<Run[]>(this.serviceUrl);
  }

}
