import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../core/models/activity.model';
import {PlotlyModule} from 'angular-plotly.js';

import * as PlotlyJS from 'plotly.js-dist-min';
import {ActivityType} from '../../core/models/activity-type.model';

PlotlyModule.plotlyjs = PlotlyJS;

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  imports: [
    PlotlyModule
  ]
})
export class LineChartComponent implements OnInit {

  @Input()
  startDate: Date;
  @Input()
  endDate: Date;
  @Input()
  activities: Activity[];
  @Input()
  selectedActivityType: ActivityType;

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

    const matches = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return 0;

    const [_, hours, minutes, seconds] = matches;

    // Convert to numbers, defaulting to 0 if undefined
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const s = Number(seconds) || 0;

    return (h * 3600) + (m * 60) + s;
  }

  prepareTempoLineChart() {
    const resultMap = new Map();
    this.activities.filter((activity) => activity.activityType === this.selectedActivityType)
    .forEach(activity => {

      const activityDistance: number = activity.distance;
      const activityDurationSeconds = this.durationToSeconds(activity.duration);
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
