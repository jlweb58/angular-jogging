import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {Run} from '../models/run.model';
import {LoggerService} from './logger.service';
import {environment} from '../../../environments/environment';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RunService {
  private serviceUrl = environment.baseUrl + '/jogging/runs';
  // tslint:disable-next-line:variable-name
  private _runs = new BehaviorSubject<Run[]>([]);
  private dataStore: { runs: Run[] } = { runs: [] }; // store our data in memory
  private isReady = false;

  private static isBetweenDates(startDate: Date, endDate: Date, run: Run) {
    const runDate: Date = new Date(run.date + 'T00:00:00Z');
    const after = runDate.getTime() >= startDate.getTime();
    const before = runDate.getTime() <= endDate.getTime();
    return after && before;
  }


  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private storageService: StorageService,

  ) { }

  public getRuns(): Observable<Run[]> {
    return this._runs.asObservable();
  }

  public loadAll() {
    this.http.get<Run[]>(this.serviceUrl).subscribe(
      data => {
        this.dataStore.runs = data;
        this._runs.next(Object.assign({}, this.dataStore).runs);
        this.storageService.putRuns(data);
      },
      error => this.logger.log('Could not load runs.')
    );
  }

  public create(run: Run): Observable<Run> {
    const replaySubject: ReplaySubject<Run> = new ReplaySubject<Run>(1);
    const httpRequest: Observable<Run> = this.http
      .post<Run>(this.serviceUrl, run );
    httpRequest.subscribe(
        replaySubject
      );
    replaySubject.subscribe(
      data => {
        run.id = data.id;
        this.dataStore.runs.push(data);
        this.storageService.putRun(data);
        this._runs.next(Object.assign({}, this.dataStore).runs);
        // This refreshes the table view - shouldn't be necessary!
        this.loadAll();
      },
      error => {
        this.logger.log('Could not create run.');
      }
    );

    return replaySubject.asObservable();
  }

  public update(run: Run) {
    this.http
      .put<Run>(`${this.serviceUrl}/${run.id}`, run)
      .subscribe(
        data => {
          this.dataStore.runs.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.runs[i] = data;
              this.storageService.putRun(data);
            }
          });

          this._runs.next(Object.assign({}, this.dataStore).runs);
        },
        error => this.logger.log('Could not update run.')
      );
  }

  public getRunsForDateRange(startDate: Date, endDate: Date): Run[] {
    let runs;
    this.getRuns().subscribe(results => {
      if (!results) {
        return;
      }
      runs = results;
    });
    return runs.filter(run => RunService.isBetweenDates(startDate, endDate, run));
  }

}
