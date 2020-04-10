import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Shoes} from './models/shoes.model';
import {LoggerService} from './logger/logger.service';
import {Run} from './models/run.model';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {
  private serviceUrl = 'http://localhost:9000/jogging/shoes';

  // tslint:disable-next-line:variable-name
  private _shoes = new BehaviorSubject<Shoes[]>([]);
  private dataStore: { shoes: Shoes[] } = { shoes: []} ;
  readonly shoes = this._shoes.asObservable();

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
  ) { }

  loadAll() {
    this.http.get<Shoes[]>(this.serviceUrl).subscribe(
      data => {
        this.dataStore.shoes = data;
        this._shoes.next(Object.assign({}, this.dataStore).shoes);
      },
      error => this.logger.log('Could not load shoes')
    );
  }

  update(shoes: Shoes) {
    this.http
      .put<Shoes>(`${this.serviceUrl}/${shoes.id}`, shoes)
      .subscribe(
        data => {
          this.dataStore.shoes.forEach((t, i) => {
            if (t.id === data.id) {
              this.dataStore.shoes[i] = data;
            }
          });

          this._shoes.next(Object.assign({}, this.dataStore).shoes);
          // Key for getting the table to update automatically
          this.loadAll();
        },
        error => this.logger.log('Could not update shoes.')
      );
  }
}
