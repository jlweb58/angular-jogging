import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, defer, Observable, of, ReplaySubject, Subscription, throwError} from 'rxjs';
import {Activity} from '../models/activity.model';
import {LoggerService} from './logger.service';
import {environment} from '../../../environments/environment';
import {StorageService} from './storage.service';
import {catchError, shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private serviceUrl = environment.baseUrl + '/jogging/activities';
  private readonly activities$ = new BehaviorSubject<Activity[]>([]);
  private dataStore: { activity: Activity[] } = { activity: [] }; // store our data in memory
  private shouldReload = true;
  private loadSubscription?: Subscription;

  private static isBetweenDates(startDate: Date, endDate: Date, activity: Activity) {
    const activityDate: Date = new Date(activity.date);
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
    return this.activities$.asObservable();
  }

  loadAll(): Observable<Activity[]> {
    // Clear any existing subscription
    this.loadSubscription?.unsubscribe();

    // Create a stream that first checks cache, then falls back to network
    const activities$ = defer(() => {
      if (!this.shouldReload) {
        const cached = this.storageService.getActivities();
        return of(cached);
      }

      return this.http.get<Activity[]>(this.serviceUrl).pipe(
        tap(activities => {
          this.storageService.putActivities(activities);
          this.shouldReload = false;
        })
      );
    }).pipe(
      // Handle errors properly
      catchError(error => {
        this.logger.log('Failed to load activities: '+ error);
        // Re-throw to let components handle the error
        return throwError(() => error);
      }),
      // Share the response to multiple subscribers
      shareReplay(1)
    );

    // Store the subscription
    this.loadSubscription = activities$.subscribe(
      activities => this.activities$.next(activities)
    );

    // Return the observable for components to subscribe to
    return this.activities$.asObservable();
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
        this.activities$.next(Object.assign({}, this.dataStore).activity);
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

  public delete(activity: Activity): Observable<any> {
    return this.http.delete(`${this.serviceUrl}/${activity.id}`, {
      responseType: 'text',
    })
      .pipe(

        catchError((error) => {
          this.logger.log('Error deleting activity');
          throw new Error(error);
        }),
      )

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

          this.activities$.next(Object.assign({}, this.dataStore).activity);
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

  // Cleanup method
  destroy() {
    this.loadSubscription?.unsubscribe();
    this.activities$.complete();
  }

}
