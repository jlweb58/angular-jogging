import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {ChartIntervalType} from '../../core/models/chart-interval-type';
import {ActivityType} from '../../core/models/activity-type.model';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.css'],
    standalone: false
})
export class BarChartComponent implements OnInit {

  @Input()
  startDate: Date;
  @Input()
  endDate: Date;
  @Input()
  activities: Activity[];
  @Input()
  chartIntervalType: ChartIntervalType;
  @Input()
  selectedActivityType: ActivityType;

  private dataPlot = {
    x: [],
    y: [],
    type: 'bar', marker: {color: 'blue'},
    hovertemplate: '%{y} km<br>%{text}<extra></extra>',
    text: [],
  };

  public graph =  {
    data: [],
    layout: {
      width: 600,
      height: 400,
      title: '',
      hovermode: 'closest',
      yaxis: { title: '' },
      xaxis: { type: 'date' }
    },
  };
  constructor() { }

  ngOnInit(): void {
    if (this.chartIntervalType === ChartIntervalType.Monthly) {
      this.graph.layout.title = 'Monthly km chart';
      this.graph.layout.yaxis.title = 'Kilometers per month';
      this.prepareMonthlyChart();

    } else {
      this.graph.layout.title = 'Yearly km chart';
      this.graph.layout.yaxis.title = 'Kilometers per year';
      this.prepareYearlyChart();
    }
  }

  sortMap(map: Map<string, number>): Map<string, number>  {
    const sortedMap = new Map();
    const sortedKeys = [ ... map.keys()].sort();
    sortedKeys.forEach( (k) => {
      sortedMap.set(k, map.get(k));
    } );
    return sortedMap;
  }

  prepareMonthlyChart() {
    const resultMap = new Map();
    this.activities.filter((activity) => activity.activityType === this.selectedActivityType)
     .forEach(activity =>  {
      const yearMonth: string = activity.date.substr(0, 7);
      if (resultMap.has(yearMonth)) {
        resultMap.set(yearMonth, resultMap.get(yearMonth) + activity.distance);
      } else {
        resultMap.set(yearMonth, activity.distance);
      }
    });
    this.pushToGraphData(this.sortMap(resultMap));
  }

  pushToGraphData(sortedMap) {
    this.dataPlot.x = [ ... sortedMap.keys()];
    this.dataPlot.y = [ ... sortedMap.values()];
    this.dataPlot.text = [... sortedMap.keys()];
    this.graph.data.push(this.dataPlot);
  }

  prepareYearlyChart() {
    const resultMap = new Map();
    this.activities.filter((activity) => activity.activityType === this.selectedActivityType)
    .forEach(activity =>  {
      const year: string = activity.date.substr(0, 4);
      if (resultMap.has(year)) {
        resultMap.set(year, resultMap.get(year) + activity.distance);
      } else {
        resultMap.set(year, activity.distance);
      }
    });
    this.pushToGraphData(this.sortMap(resultMap));
  }
}
