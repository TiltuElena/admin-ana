import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { PageRoutes } from '../../../../shared/enums';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerService } from '../../../../api/modules/customer.service';
import { DatePipe } from '@angular/common';
import {MdlCurrencyPipe} from '../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [
    ButtonDirective,
    CardModule,
    DividerModule,
    MdlCurrencyPipe,
    PrimeTemplate,
    Ripple,
    TableModule,
    TranslateModule,
    DatePipe
  ],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss'
})
export class CustomersTableComponent {
  constructor(private router: Router, private customerService: CustomerService) {
  }
  customers = []
  defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s'
  ngOnInit() {
    this.customerService.getRecent().subscribe((customers: any) => {
      console.log(customers.data);
      this.customers = customers.data;
    })

  }

  // customers = [
  //   {
  //     id: '0',
  //     dateSignUp: '01 Aug',
  //     name: 'Fabio Lorenzo',
  //     nrOfPlacedOrders: 2,
  //     totalSpent: 2340,
  //     photo:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s',
  //   },
  //   {
  //     id: '1',
  //     dateSignUp: '04 Aug',
  //     name: 'Sean Piccot',
  //     nrOfPlacedOrders: 0,
  //     totalSpent: 0,
  //     photo:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s',
  //   },
  //   {
  //     id: '2',
  //     dateSignUp: '01 Aug',
  //     name: 'Bell Covely',
  //     nrOfPlacedOrders: 7,
  //     totalSpent: 7680,
  //     photo:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s',
  //   },
  //   {
  //     id: '3',
  //     dateSignUp: '08 Aug',
  //     name: 'Maria Lorenzo',
  //     nrOfPlacedOrders: 3,
  //     totalSpent: 3470,
  //     photo:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s',
  //   },
  //   {
  //     id: '4',
  //     dateSignUp: '01 Aug',
  //     name: 'Marco Pollo',
  //     nrOfPlacedOrders: 2,
  //     totalSpent: 2340,
  //     photo:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDwmG52pVI5JZfn04j9gdtsd8pAGbqjjLswg&s',
  //   },
  // ];

  redirectToCustomers(){
    this.router.navigate([PageRoutes.Customers]).then()
  }
}
