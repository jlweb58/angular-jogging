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

  public putRun(run: Activity) {
    sessionStorage.setItem(run.id.toString(), JSON.stringify(run));
  }

  public putRuns(runs: Activity[]) {
    runs.forEach(run => this.putRun(run));
  }

  public getAll(): Activity[] {
    const runs: Activity[] = [];
    const storageSize = sessionStorage.length;
    for (let i = 0; i < storageSize; i++) {
      runs.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
    return runs;
  }

}
