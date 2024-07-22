import {waitForAsync, ComponentFixture, getTestBed} from '@angular/core/testing';
import {MapViewComponent} from './map-view.component';

describe('MapViewComponent', () => {
  let component: MapViewComponent;
  let fixture: ComponentFixture<MapViewComponent>;

  beforeEach(waitForAsync(() => {
    getTestBed().configureTestingModule({
      declarations: [ MapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = getTestBed().createComponent(MapViewComponent);
    component = fixture.componentInstance;
    component.gpxTrack =  {
      trackElements: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
