import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Run} from './models/run.model';
import {LoggerService} from './logger/logger.service';

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
    private logger: LoggerService,

  ) { }

  loadAll() {
    this.http.get<Run[]>(this.serviceUrl).subscribe(
      data => {
        // @ts-ignore
        this.dataStore.runs = data;
        this._runs.next(Object.assign({}, this.dataStore).runs);
      },
      error => this.logger.log('Could not load runs.')
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
      error => this.logger.log('Could not load run.')
    );
  }

  create(run: Run) {
    this.http
      .post<Run>(this.serviceUrl, run )
      .subscribe(
        data => {
          this.dataStore.runs.push(data);
          this._runs.next(Object.assign({}, this.dataStore).runs);
          // Key for getting the table to update automatically
          this.loadAll();
        },
        error => this.logger.log('Could not create run.')
      );
  }

  update(run: Run) {
    this.http
      .put<Run>(`${this.serviceUrl}/${run.id}`, run)
      .subscribe(
        data => {
          this.dataStore.runs.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.runs[i] = data;
            }
          });

          this._runs.next(Object.assign({}, this.dataStore).runs);
          // Key for getting the table to update automatically
          this.loadAll();
        },
        error => this.logger.log('Could not update run.')
      );
  }

  getRuns(): Observable<Run[]> {
    return this.http.get<Run[]>(this.serviceUrl);
  }

  isBetweenDates(startDate: Date, endDate: Date, run: Run) {
    const runDate: Date = new Date(run.date + 'T00:00:00Z');
    const after = runDate.getTime() >= startDate.getTime();
    const before = runDate.getTime() <= endDate.getTime();
    return after && before;
  }

  getRunsForDateRange(startDate: Date, endDate: Date): Run[] {
    this.logger.log('Getting runs between ' + startDate + ' ' + endDate);
    return this.dataStore.runs.filter(run => this.isBetweenDates(startDate, endDate, run));
  }

}
