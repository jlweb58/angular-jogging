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
  zoom = 15;
  center: google.maps.LatLngLiteral;
  @Input() gpxTrack: GpxTrack;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
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
    const path = gpxTrackElements.map(gpx => ({ lat: gpx.latitude, lng: gpx.longitude}));
    this.polylineOptions.path = path;
/*
    this.polylineOptions.path = [
      { lat: 48.101343, lng: 11.670856 },
      { lng: 11.66917, lat: 48.101488 },
      { lng: 11.669025, lat: 48.101515 },
      { lng: 11.668924, lat: 48.101527 },
      { lng: 11.668819, lat: 48.101541 },
      { lng: 11.668644, lat: 48.101569 },
      { lng: 11.668574, lat: 48.101585 },
      { lng: 11.665126, lat: 48.102306 },
    ];
*/

    this.logger.log('Map View ' + this.gpxTrack);

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

}
