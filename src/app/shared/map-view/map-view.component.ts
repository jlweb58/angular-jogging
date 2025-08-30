import {Component, Input, OnInit} from '@angular/core';
import {LoggerService} from '../../core/services/logger.service';
import {GpxTrack} from '../../core/models/gpx-track.model';
import {GpxTrackElement} from '../../core/models/gpx-track-element.model';
import {GoogleMap, MapPolyline} from '@angular/google-maps';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  imports: [
    GoogleMap,
    MapPolyline,
    NgIf
  ]
})
export class MapViewComponent implements OnInit {
  zoom = 14;
  center: google.maps.LatLngLiteral;
  @Input() gpxTrack: GpxTrack;
  isApiLoaded = false;
  isMapReady = false;

  private highestLat: number;
  private lowestLat: number;
  private highestLng: number;
  private lowestLng: number;

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
    this.waitForGoogleMaps().then(() => {
      this.initializeMap();
      this.isApiLoaded = true;
      // Add a small delay to ensure the map component is fully initialized
      setTimeout(() => {
        this.isMapReady = true;
      }, 100);

    }).catch(error => {
      this.logger.error('Failed to load Google Maps API', error);
    });
  }


  private waitForGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if API is already loaded
      if (typeof google !== 'undefined' && google.maps) {
        this.isApiLoaded = true;
        resolve();
        return;
      }

      // Poll for Google Maps availability
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max wait

      const checkGoogle = () => {
        if (typeof google !== 'undefined' && google.maps) {
          resolve();
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(checkGoogle, 100);
        } else {
          reject(new Error('Google Maps API failed to load within timeout'));
        }
      };

      checkGoogle();
    });
  }

  private initializeMap(): void {
    if (!this.gpxTrack || !this.gpxTrack.trackElements) {
      this.logger.error('No GPX track data available', null);
      return;
    }

    const gpxTrackElements: GpxTrackElement[] = this.gpxTrack.trackElements;
    this.polylineOptions.path = gpxTrackElements.map(gpx => ({lat: gpx.latitude, lng: gpx.longitude}));
    const centerLat = this.getAverageForField(this.polylineOptions.path, 'lat');
    const centerLong = this.getAverageForField(this.polylineOptions.path, 'lng');
    this.highestLat = gpxTrackElements[0].latitude;
    this.lowestLat = gpxTrackElements[0].latitude;
    this.highestLng = gpxTrackElements[0].longitude;
    this.lowestLng = gpxTrackElements[0].longitude;
    this.setBoundingBox(gpxTrackElements);
    this.zoom = this.getZoom(this.lowestLat, this.lowestLng, this.highestLat, this.highestLng);
    this.center = {
      lat: centerLat,
      lng: centerLong
    };
  }

  setBoundingBox(gpxTrackElements: GpxTrackElement[]): void {
    gpxTrackElements.forEach(e => {
      if (e.latitude > this.highestLat) {
        this.highestLat = e.latitude;
      } else if (e.latitude < this.lowestLat) {
        this.lowestLat = e.latitude;
      }
      if (e.longitude > this.highestLng) {
        this.highestLng = e.longitude;
      } else if (e.longitude < this.lowestLng) {
        this.lowestLng = e.longitude;
      }

    })

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

    getLatRad(lat: number): number {
      let sine = Math.sin(lat * Math.PI / 180);
      let radX2 = Math.log((1 + sine) / (1 - sine)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    getZoom(latA: number, lngA: number, latB: number, lngB: number): number {
      let latDif = Math.abs(this.getLatRad(latA) - this.getLatRad(latB));
      let lngDif = Math.abs(lngA - lngB);
      let latFrac = latDif / Math.PI;
      let lngFrac = lngDif / 360;
      let latZoom = Math.log(1 / latFrac) / Math.log(2);
      let lngZoom = Math.log(1 / lngFrac) / Math.log(2);
      return Math.min(latZoom, lngZoom) + 1;
    }

}
