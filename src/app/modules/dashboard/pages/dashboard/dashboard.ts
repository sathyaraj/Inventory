import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { Boxes, PackageMinus, BaggageClaim } from 'lucide-angular';
import Chart from 'chart.js/auto';
import { Master } from '../../../../core/services/master';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements AfterViewInit, OnDestroy {

  boxes = Boxes;
  packageminus = PackageMinus;
  baggageclaim = BaggageClaim;

  overviewChart: any;
  barChart: any;

  dashboardData: any = {};

  constructor(
    private fb: FormBuilder,
    private masterService: Master,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  ngAfterViewInit(): void {
    this.loadOverviewChart();
    this.loadBarChart();
  }

  ngOnDestroy(): void {
    if (this.overviewChart) {
      this.overviewChart.destroy();
    }

    if (this.barChart) {
      this.barChart.destroy();
    }
  }

  loadDashboard() {
    this.masterService.getDashboard()
      .subscribe((res: any) => {
        console.log(res);
        this.dashboardData = res;
                this.cdr.detectChanges();

      });
  }

  chartType:any = 'month';

 loadOverviewChart() {

  this.masterService
    .getOverviewChart(this.chartType)
    .subscribe((res: any) => {

      console.log(res);

      if (this.overviewChart) {
        this.overviewChart.destroy();
      }

      this.overviewChart = new Chart('overviewChart', {

        type: 'line',

        data: {

          labels: res.labels,

          datasets: [
            {
              label: 'Stock',

              data: res.stockData,

              borderColor: '#3b82f6',

              backgroundColor:
                'rgba(59,130,246,0.2)',

              fill: true,

              tension: 0.4
            }
          ]
        },

        options: {
          responsive: true
        }

      });

    });

}

barChartType:any = 'month';

loadBarChart() {

  this.masterService
    .getBarChart(this.barChartType)
    .subscribe((res: any) => {

      console.log(res);

      if (this.barChart) {
        this.barChart.destroy();
      }

      this.barChart = new Chart('barChart', {

        type: 'bar',

        data: {

          labels: res.labels,

          datasets: [
            {
              label: 'Total Items',

              data: res.totalItemsData,

              backgroundColor: '#10b981'
            },

            {
              label: 'Total Stock',

              data: res.totalStockData,

              backgroundColor: '#ef4444'
            }
          ]
        },

        options: {
          responsive: true
        }

      });

    });

}
}