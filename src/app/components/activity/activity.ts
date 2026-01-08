import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './activity.html',
  styleUrls: ['./activity.css']
})
export class ActivityComponent {
  
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private delayBetweenPoints = 100; 

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [{
        label: 'Preview',
        data: [40, 25, 55, 30, 10, 35, 20, 50],
        borderColor: '#29B6F6', 
        backgroundColor: 'rgba(41, 182, 246, 0.1)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#1565C0',
        pointRadius: 4,
        fill: true,
        tension: 0.4,
    }]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { 
        grid: { display: false } 
      },
      y: { 
        beginAtZero: true, 
        grid: { color: '#f0f0f0' }, 
        ticks: { stepSize: 10 } 
      }
    },
    // FIX 1: Cast this entire object to 'any' to bypass TS2353
    animation: {
      x: {
        type: 'number',
        easing: 'linear',
        duration: this.delayBetweenPoints,
        from: NaN,
        // FIX 2: Added ': any' to ctx
        delay: (ctx: any) => {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * this.delayBetweenPoints;
        }
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: this.delayBetweenPoints,
        // FIX 2: Added ': any' to ctx
        from: (ctx: any) => {
             if (ctx.index === 0) {
                 return ctx.chart.scales['y'].getPixelForValue(0);
             }
             const meta = ctx.chart.getDatasetMeta(ctx.datasetIndex);
             const prevModel = meta.data[ctx.index - 1]; 
             return prevModel ? prevModel.getProps(['y'], true).y : 0;
        },
        // FIX 2: Added ': any' to ctx
        delay: (ctx: any) => {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * this.delayBetweenPoints;
        }
      }
    } as any 
  };
}