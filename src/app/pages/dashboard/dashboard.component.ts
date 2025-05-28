import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Button, ButtonDirective } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { BaseChartDirective } from 'ng2-charts';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { OrdersChartComponent } from './components/orders-chart/orders-chart.component';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { Router } from '@angular/router';
import { PageRoutes } from '../../shared/enums';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../../api/modules/customer.service';
import { OrdersService } from '../../api/modules/orders.service';
import { AsyncPipe } from '@angular/common';
import {MdlCurrencyPipe} from '../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-dashboard.route.ts',
  standalone: true,
  imports: [
    CardModule,
    DividerModule,
    Button,
    ButtonDirective,
    Ripple,
    BaseChartDirective,
    TableModule,
    MdlCurrencyPipe,
    TagModule,
    OrdersChartComponent,
    RevenueChartComponent,
    CalendarModule,
    OrdersTableComponent,
    CustomersTableComponent,
    TranslateModule,
    SelectButtonModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private translate: TranslateService,
    private customerService: CustomerService,
    private orderService: OrdersService
  ) {}
  redirectToOrder() {
    this.router.navigate([PageRoutes.Orders]).then();
  }

  redirectToCustomer() {
    this.router.navigate([PageRoutes.Customers]).then();
  }

  dataOptions = [
    { title: 'Day', value: 0 },
    { title: 'Week', value: 1 },
    { title: 'Month', value: 2 },
    { title: 'Year', value: 3 },
  ];

  selectedDataOption = this.dataOptions[0].value;
  selectedOption = new BehaviorSubject(0);
  totalUsers = 0
  totalOrders = 0
  totalOrdersPrice = 0
  totalConfirmedOrders: any
  totalNewOrders: any
  totalRejectedOrders: any


  ngOnInit() {
    // Initial setup of options
    this.updateTranslations();

    // Subscribe to language change events
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTranslations();
    });

    this.customerService.getTotalUsers().subscribe((total: any) => {
      this.totalUsers = total.data
    })

    this.orderService.getTotalNumberOfrders().subscribe((total: any) => {
      this.totalOrders = total.data
    })

    this.orderService.getTotalPriceOfrders().subscribe((total: any) => {
      this.totalOrdersPrice = total.data
    })

    this.orderService.getNumberOfConfirmedOrders().subscribe((total: any) => {
      this.totalConfirmedOrders = total.data
    })

    this.orderService.getNumberOfRejectedOrders().subscribe((total: any) => {
      this.totalRejectedOrders = total.data
    })

    this.orderService.getNumberOfNewOrders().subscribe((total: any) => {
      this.totalNewOrders = total.data
    })
  }

  updateTranslations() {
    this.translate
      .get([
        'DASHBOARD.DATA_OPTIONS_DAY',
        'DASHBOARD.DATA_OPTIONS_WEEK',
        'DASHBOARD.DATA_OPTIONS_MONTH',
        'DASHBOARD.DATA_OPTIONS_YEAR',
      ])
      .subscribe((translations) => {
        this.dataOptions = [
          {
            title: translations['DASHBOARD.DATA_OPTIONS_DAY'],
            value: 0,
          },
          {
            title: translations['DASHBOARD.DATA_OPTIONS_WEEK'],
            value: 1,
          },
          {
            title: translations['DASHBOARD.DATA_OPTIONS_MONTH'],
            value: 2,
          },
          {
            title: translations['DASHBOARD.DATA_OPTIONS_YEAR'],
            value: 3,
          },
        ];
      });
  }

  onDataOptionChange(event: number) {
    if (event !== null && this.selectedOption.getValue() !== event) {
      console.log('Selected data option:', event);

      this.selectedOption.next(event);
    }
  }
}
