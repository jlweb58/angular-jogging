import {Component, Input, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {GpxTrack} from '../../core/models/gpx-track.model';
import {GpxTrackElement} from '../../core/models/gpx-track-element.model';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  zoom = 14;
  center: google.maps.LatLngLiteral;
  @Input() gpxTrack: GpxTrack;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  polylineOptions: google.maps.PolylineOptions =  {
    strokeColor:  '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };
  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    const gpxTrackElements: GpxTrackElement[] = this.gpxTrack.trackElements;
    this.polylineOptions.path = gpxTrackElements.map(gpx => ({lat: gpx.latitude, lng: gpx.longitude}));
    const centerLat = this.getAverageForField(this.polylineOptions.path, 'lat');
    const centerLong = this.getAverageForField(this.polylineOptions.path, 'lng');

    this.center = {
      lat: centerLat,
      lng: centerLong
    };
  }

  getAverageForField(arr, key): number {
      let sum = 0;
      let count = 0;
      arr.forEach(e => {
        count++;
        sum += e[key];
      });
      return sum / count;

    }

}
