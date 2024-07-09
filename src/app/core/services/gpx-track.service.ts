import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoggerService} from './logger.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Activity} from '../models/activity.model';
import {GpxTrack} from '../models/gpx-track.model';

@Injectable({
  providedIn: 'root'
})
export class GpxTrackService {
  private serviceUrl = environment.baseUrl + '/jogging/gpxtrack';


  constructor(
    private http: HttpClient,
    private logger: LoggerService,
  ) {  }


  public getGpxTrack(activity: Activity): Observable<GpxTrack> {
    return this.http.get<GpxTrack>(`${this.serviceUrl}/${activity.id}`);
  }

  public saveGpxTrack(activity: Activity, gpxData: string): Observable<GpxTrack> {
    return this.http.post<GpxTrack>(`${this.serviceUrl}/${activity.id}`, gpxData);
  }

}
