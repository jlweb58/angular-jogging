import { TestBed, async } from '@angular/core/testing';
import {BarChartComponent} from './bar-chart.component';


describe('BarChartComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BarChartComponent,
      ],
      providers: [],
    }).compileComponents();

  }));
});

it('should create the component', async( () => {
  const fixture = TestBed.createComponent(BarChartComponent);

}));

