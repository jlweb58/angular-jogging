import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Gear} from '../models/gear.model';
import {LoggerService} from './logger.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GearService {
  private serviceUrl = environment.baseUrl + '/jogging/gear';

  // tslint:disable-next-line:variable-name
  private _gear = new BehaviorSubject<Gear[]>([]);
  private dataStore: { gear: Gear[] } = { gear: []} ;
  readonly gear = this._gear.asObservable();

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
  ) { }

  loadAll() {
    this.http.get<Gear[]>(this.serviceUrl).subscribe(
      data => {
        this.dataStore.gear = data;
        this._gear.next(Object.assign({}, this.dataStore).gear);
      },
      error => this.logger.log('Could not load gear')
    );
  }

  create(gear: Gear) {
    this.http
      .post<Gear>(this.serviceUrl, gear )
      .subscribe(
        data => {
          this.dataStore.gear.push(data);
          this._gear.next(Object.assign({}, this.dataStore).gear);
          // Key for getting the table to update automatically
          this.loadAll();
        },
        error => this.logger.log('Could not create gear.')
      );
  }
  update(gear: Gear) {
    this.http
      .put<Gear>(`${this.serviceUrl}/${gear.id}`, gear)
      .subscribe(
        data => {
          this.dataStore.gear.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.gear[i] = data;
            }
          });

          this._gear.next(Object.assign({}, this.dataStore).gear);
          // Key for getting the table to update automatically
          this.loadAll();
        },
        error => this.logger.log('Could not update gear.')
      );
  }
}
