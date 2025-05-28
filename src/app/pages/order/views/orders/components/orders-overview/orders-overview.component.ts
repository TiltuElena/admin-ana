import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CardModule } from 'primeng/card';

import { ChartOptions, ChartType } from 'chart.js';
import { TranslateModule } from '@ngx-translate/core';
import { OrdersService } from '../../../../../../api/modules/orders.service';
import { tap } from 'rxjs';
import {MdlCurrencyPipe} from '../../../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-orders-overview',
  standalone: true,
  imports: [
    BaseChartDirective,
    CardModule,
    MdlCurrencyPipe,
    TranslateModule,

  ],
  templateUrl: './orders-overview.component.html',
  styleUrl: './orders-overview.component.scss'
})
export class OrdersOverviewComponent {
  constructor(
    private orderService: OrdersService
  ) {}

  totalOrders = 0
  totalOrdersPrice = 0
  paidOrdersPrice = 136534.00; // Add a property for paid orders price
  notPaidOrdersPrice = 68266.00; // Add a property for not paid orders price

  // ngOnInit() {
  //   this.orderService.getTotalNumberOfrders().subscribe((total: any) => {
  //     this.totalOrders = total.data
  //   })
  //
  //   this.orderService.getTotalPriceOfrders().subscribe((total: any) => {
  //     this.totalOrdersPrice = total.data
  //   })
  // }

  public doughnutChartData: any = {
    labels: ['Paid', 'Not Paid'],
    datasets: [
      {
        label: 'Revenue',
        data: [136534.00, 68266.00],
        cutout: '70%',
        backgroundColor: [
          'rgb(16, 185, 129)',
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 1,
        borderWidth: 0,
      },
    ],
  };

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'right',
        // labels: {
        //   usePointStyle: true, // Use a circular point style for the legend
        //   pointStyle: 'circle', // Set the point style to circle
        // },
      },
    },

  }

  public doughnutChartType: ChartType = 'doughnut'

  ngOnInit() {
    this.orderService.getTotalNumberOfrders().subscribe((total: any) => {
      this.totalOrders = total.data;
    });

    this.orderService.getTotalPriceOfrders().pipe(
      tap((total: any) => {
        this.totalOrdersPrice = total.data;
        // Simulate fetching paid and not paid amounts (replace with your actual logic)
        this.paidOrdersPrice = this.totalOrdersPrice * 0.6; // Example: 60% paid
        this.notPaidOrdersPrice = this.totalOrdersPrice * 0.4; // Example: 40% not paid
        this.updateChartData(); // Call the function to update chart data
      })
    ).subscribe();
  }

  updateChartData() {
    this.doughnutChartData.datasets[0].data = [this.paidOrdersPrice, this.notPaidOrdersPrice];
    console.log('1111111');
  }
}
