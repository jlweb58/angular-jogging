import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';
import {Run} from '../models/run.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private logger: LoggerService
  ) { }

  public putRun(run: Run) {
    sessionStorage.setItem(run.id.toString(), JSON.stringify(run));
  }

  public putRuns(runs: Run[]) {
    runs.forEach(run => this.putRun(run));
  }

  public getAll(): Run[] {
    const runs: Run[] = [];
    const storageSize = sessionStorage.length;
    for (let i = 0; i < storageSize; i++) {
      runs.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
    }
    return runs;
  }

}
