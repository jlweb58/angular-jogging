import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: MatDialog, useValue: {}},
        { provide: HttpClient, useValue: {}},
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
