import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject, Subscription} from 'rxjs';
import {Activity} from '../models/activity.model';
import {LoggerService} from './logger.service';
import {environment} from '../../../environments/environment';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private serviceUrl = environment.baseUrl + '/jogging/activities';
  // tslint:disable-next-line:variable-name
  private _activities = new BehaviorSubject<Activity[]>([]);
  private dataStore: { activity: Activity[] } = { activity: [] }; // store our data in memory
  private shouldReload = true;

  private static isBetweenDates(startDate: Date, endDate: Date, activity: Activity) {
    const activityDate: Date = new Date(activity.date + 'T00:00:00Z');
    const after = activityDate.getTime() >= startDate.getTime();
    const before = activityDate.getTime() <= endDate.getTime();
    return after && before;
  }


  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private storageService: StorageService,

  ) { }

  public getActivities(): Observable<Activity[]> {
    return this._activities.asObservable();
  }

  public loadAll() {
    if (!this.shouldReload) { return; }
    this.http.get<Activity[]>(this.serviceUrl).subscribe(
      data => {
        this.dataStore.activity = data;
        this._activities.next(Object.assign({}, this.dataStore).activity);
        this.storageService.putActivities(data);
        this.logger.log('Loaded activities');
        this.shouldReload = false;
      },
      error => this.logger.log('Could not load activities.')
    );
  }

  public create(activity: Activity): Observable<Activity> {
    const replaySubject: ReplaySubject<Activity> = new ReplaySubject<Activity>(1);
    const httpRequest: Observable<Activity> = this.http
      .post<Activity>(this.serviceUrl, activity );
    httpRequest.subscribe(
        replaySubject
      );
    replaySubject.subscribe(
      data => {
        activity.id = data.id;
        this.dataStore.activity.push(data);
        this.storageService.putActivity(data);
        this._activities.next(Object.assign({}, this.dataStore).activity);
        this.shouldReload = true;
        // This refreshes the table view - shouldn't be necessary!
        this.loadAll();
      },
      error => {
        this.logger.log('Could not create activity.');
      }
    );

    return replaySubject.asObservable();
  }

  public update(activity: Activity) {
    this.http
      .put<Activity>(`${this.serviceUrl}/${activity.id}`, activity)
      .subscribe(
        data => {
          this.dataStore.activity.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.activity[i] = data;
              this.storageService.putActivity(data);
            }
          });

          this._activities.next(Object.assign({}, this.dataStore).activity);
          this.shouldReload = true;
        },
        error => this.logger.log('Could not update activity.')
      );
  }

  public getActivitiesForDateRange(startDate: Date, endDate: Date): Activity[] {
    let activities: any[];
    this.getActivities().subscribe(results => {
      if (!results) {
        return;
      }
      activities = results;
    });
    return activities.filter(activity => ActivityService.isBetweenDates(startDate, endDate, activity));
  }

}
