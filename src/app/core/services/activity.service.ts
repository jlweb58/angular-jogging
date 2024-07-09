import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {Activity} from '../models/activity.model';
import {LoggerService} from './logger.service';
import {environment} from '../../../environments/environment';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private serviceUrl = environment.baseUrl + '/jogging/runs';
  // tslint:disable-next-line:variable-name
  private _runs = new BehaviorSubject<Activity[]>([]);
  private dataStore: { runs: Activity[] } = { runs: [] }; // store our data in memory
  private shouldReload = true;

  private static isBetweenDates(startDate: Date, endDate: Date, run: Activity) {
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

  public getRuns(): Observable<Activity[]> {
    return this._runs.asObservable();
  }

  public loadAll() {
    if (!this.shouldReload) { return; }
    this.http.get<Activity[]>(this.serviceUrl).subscribe(
      data => {
        this.dataStore.runs = data;
        this._runs.next(Object.assign({}, this.dataStore).runs);
        this.storageService.putRuns(data);
        this.logger.log('Loaded runs');
        this.shouldReload = false;
      },
      error => this.logger.log('Could not load runs.')
    );
  }

  public create(run: Activity): Observable<Activity> {
    const replaySubject: ReplaySubject<Activity> = new ReplaySubject<Activity>(1);
    const httpRequest: Observable<Activity> = this.http
      .post<Activity>(this.serviceUrl, run );
    httpRequest.subscribe(
        replaySubject
      );
    replaySubject.subscribe(
      data => {
        run.id = data.id;
        this.dataStore.runs.push(data);
        this.storageService.putRun(data);
        this._runs.next(Object.assign({}, this.dataStore).runs);
        this.shouldReload = true;
        // This refreshes the table view - shouldn't be necessary!
        this.loadAll();
      },
      error => {
        this.logger.log('Could not create run.');
      }
    );

    return replaySubject.asObservable();
  }

  public update(run: Activity) {
    this.http
      .put<Activity>(`${this.serviceUrl}/${run.id}`, run)
      .subscribe(
        data => {
          this.dataStore.runs.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.runs[i] = data;
              this.storageService.putRun(data);
            }
          });

          this._runs.next(Object.assign({}, this.dataStore).runs);
          this.shouldReload = true;
        },
        error => this.logger.log('Could not update run.')
      );
  }

  public getRunsForDateRange(startDate: Date, endDate: Date): Activity[] {
    let runs;
    this.getRuns().subscribe(results => {
      if (!results) {
        return;
      }
      runs = results;
    });
    return runs.filter(run => ActivityService.isBetweenDates(startDate, endDate, run));
  }

}
