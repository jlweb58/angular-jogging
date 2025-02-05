import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../core/models/activity.model';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    standalone: false
})
export class LineChartComponent implements OnInit {

  @Input()
  startDate: Date;
  @Input()
  endDate: Date;
  @Input()
  activities: Activity[];
  public graph =  {
    data: [],
    layout: {
      width: 600,
      height: 400,
      title: 'Average Tempo',
      hovermode: 'closest',
      yaxis: { autorange: 'reversed', tickformat: '%H:%M:%S' },
      xaxis: { type: 'date' }
      },
  };

  constructor() { }

  ngOnInit(): void {
    this.prepareTempoLineChart();
  }

  durationToSeconds(durationString: string): number {
    const hours = parseInt(durationString.substr(0, 2), 10);
    const minutes = parseInt(durationString.substr(3, 2), 10);
    const seconds = parseInt(durationString.substr(6, 2), 10);
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  prepareTempoLineChart() {
    const resultMap = new Map();
    this.activities.forEach(activity => {

      const activityDistance: number = activity.distance;
      const activityDurationSeconds = this.durationToSeconds(activity.activityDuration.time);
      const avgPace = activityDurationSeconds / activityDistance;
      const minutes = Math.floor(avgPace / 60);
      const seconds = Math.floor(avgPace % 60);
      let formattedPace = '2020-01-01 00:0' + minutes + ':';
      if (seconds < 10) {
        formattedPace += '0';
      }
      formattedPace += seconds;
      resultMap.set(activity.date, formattedPace);
    });
    const dataPlot = {x: [ ... resultMap.keys()],
      y: [ ... resultMap.values()],
      type: 'scatter', mode: 'lines+points', marker: {color: 'red'} };
    this.graph.data.push(dataPlot);
  }

}
