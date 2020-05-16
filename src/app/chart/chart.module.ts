import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import {LineChartComponent} from './line-chart/line-chart.component';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import {PlotlyViaCDNModule} from 'angular-plotly.js';

PlotlyViaCDNModule.plotlyVersion = 'latest';
PlotlyViaCDNModule.plotlyBundle = null;

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
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
