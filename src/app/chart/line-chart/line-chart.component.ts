import {Component, Input, OnInit} from '@angular/core';
import {Run} from '../../core/models/run.model';
import {LoggerService} from '../../core/services/logger.service';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input()
  startDate: Date;
  @Input()
  endDate: Date;
  @Input()
  runs: Run[];
  public graph =  {
    data: [],
    layout: {
      width: 600,
      height: 400,
      title: 'Average Tempo',
      yaxis: { autorange: 'reversed', tickformat: '%H:%M:%S' },
      xaxis: { type: 'date' }
      },
  };

  constructor(private logger: LoggerService) { }

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
    this.runs.forEach(run => {

      const runDistance: number = run.distance;
      const runDurationSeconds = this.durationToSeconds(run.runDuration.time);
      const avgPace = runDurationSeconds / runDistance;
      const minutes = Math.floor(avgPace / 60);
      const seconds = Math.floor(avgPace % 60);
      let formattedPace = '2020-01-01 00:0' + minutes + ':';
      if (seconds < 10) {
        formattedPace += '0';
      }
      formattedPace += seconds;
      resultMap.set(run.date, formattedPace);
    });
    const dataPlot = {x: [ ... resultMap.keys()], y: [ ... resultMap.values()],
       type: 'scatter', mode: 'lines+points', marker: {color: 'red'} };
    this.graph.data.push(dataPlot);
  }

}
