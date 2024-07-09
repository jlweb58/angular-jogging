import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {Activity} from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private logger: LoggerService
  ) { }

  public putActivity(activity: Activity) {
    sessionStorage.setItem(activity.id.toString(), JSON.stringify(activity));
  }

  public putActivities(activities: Activity[]) {
    activities.forEach(activity => this.putActivity(activity));
  }

  public getAll(): Activity[] {
    const activities: Activity[] = [];
    const storageSize = sessionStorage.length;
    for (let i = 0; i < storageSize; i++) {
      activities.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
    return activities;
  }

}
