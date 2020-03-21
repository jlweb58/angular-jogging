import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTableNewComponent } from './run-table-new.component';

describe('RunTableNewComponent', () => {
  let component: RunTableNewComponent;
  let fixture: ComponentFixture<RunTableNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunTableNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTableNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
