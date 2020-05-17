import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {LineChartComponent} from './line-chart/line-chart.component';
import {PlotlyViaCDNModule} from 'angular-plotly.js';

PlotlyViaCDNModule.plotlyVersion = 'latest';
PlotlyViaCDNModule.plotlyBundle = null;

@NgModule({
  imports: [
    CommonModule,
    PlotlyViaCDNModule,
  ],
  declarations: [
    BarChartComponent,
    LineChartComponent
  ],
  exports: [
    BarChartComponent
  ]
})
export class ChartModule {

}
