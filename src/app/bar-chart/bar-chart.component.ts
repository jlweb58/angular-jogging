import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartTooltipOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {LoggerService} from '../logger/logger.service';
import {Run} from '../models/run.model';
import {ChartIntervalType} from '../models/chart-interval-type';

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
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: this.barChartToolTipOptions,
  };
  barChartData: ChartDataSets[] = [];

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.logger.log('BarChartComponent ' + this.startDate + ' ' + this.endDate);
    this.logger.log('runs: ' + this.runs);
    this.logger.log('type: ' + this.chartIntervalType);
    if (this.chartIntervalType === ChartIntervalType.Monthly) {
      this.prepareMonthlyChart();
    } else {
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

  }
}
