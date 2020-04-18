import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartFontOptions, ChartOptions, ChartTooltipOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {LoggerService} from '../services/logger.service';
import {Run} from '../models/run.model';
import {ChartIntervalType} from '../models/chart-interval-type';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input()
  startDate: Date;
  @Input()
  endDate: Date;
  @Input()
  runs: Run[];
  @Input()
  chartIntervalType: ChartIntervalType;


  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartToolTipOptions: ChartTooltipOptions =  {
    bodyFontSize: 8,
    titleFontSize: 9,
    callbacks: {
      label: (tooltipItem, data) => {
        let label = data.datasets[tooltipItem.datasetIndex].label || '';
        // @ts-ignore
        label = Math.round(tooltipItem.yLabel * 100) / 100 + ' ' + label;
        return label;
      }
    }
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: this.barChartToolTipOptions,
    title: {
      display: true,
      fontSize: 10,
    },
  };
  barChartData: ChartDataSets[] = [];

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    Chart.defaults.global.defaultFontSize = 9;
    if (this.chartIntervalType === ChartIntervalType.Monthly) {
      this.barChartOptions.title.text = 'Monthly km chart';
      this.prepareMonthlyChart();

    } else {
      this.barChartOptions.title.text = 'Yearly km chart';
      this.prepareYearlyChart();
    }
  }

  prepareMonthlyChart() {
    this.logger.log('Prepare monthly chart');
    const resultMap = new Map();
    this.runs.forEach(run =>  {
      const yearMonth: string = run.date.substr(0, 7);
      if (resultMap.has(yearMonth)) {
        resultMap.set(yearMonth, resultMap.get(yearMonth) + run.distance);
      } else {
        resultMap.set(yearMonth, run.distance);
      }
    });
    this.barChartLabels = [ ... resultMap.keys()].sort();
    this.barChartData = [{ data: [ ... resultMap.values()], label: 'km', backgroundColor: 'blue' }];
  }

  prepareYearlyChart() {
    this.logger.log('Prepare yearly chart');
    this.logger.log('Prepare monthly chart');
    const resultMap = new Map();
    this.runs.forEach(run =>  {
      const year: string = run.date.substr(0, 4);
      if (resultMap.has(year)) {
        resultMap.set(year, resultMap.get(year) + run.distance);
      } else {
        resultMap.set(year, run.distance);
      }
    });
    this.barChartLabels = [ ... resultMap.keys()].sort();
    this.barChartData = [{ data: [ ... resultMap.values()], label: 'km', backgroundColor: 'blue' }];

  }
}
