import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { DataService } from '../../services/data.service';
import { TranslateModule } from '@ngx-translate/core';
import { RoomService } from '../../../../../../api/modules/room.service';
import {MdlCurrencyPipe} from '../../../../../../shared/pipes/mdl-currency.pipe';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ButtonDirective,
    CalendarModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    PaginatorModule,
    PrimeTemplate,
    Ripple,
    TagModule,
    CheckboxModule,
    TableModule,
    MdlCurrencyPipe,
    TranslateModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @Input() workplaceDialog = false;
  @Output() changeDialogState = new EventEmitter<boolean>();
  submitted = false;
  selectedWorkplaces: any = [];

  constructor(
    private workplaceDataService: DataService,
    private roomsService: RoomService,
  ) {}

  roomsWithWorkplaces = []
  ngOnInit() {
    this.roomsService.getAll().subscribe((data:any) =>{
      this.roomsWithWorkplaces = data.data;
    })
  }

  // roomsWithWorkplaces = [
  //   {
  //     room_id: 1,
  //     workplaces: [
  //       {
  //         workplace_id: 1,
  //         name: 'Workplace 1 of room 1',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 2,
  //         name: 'Workplace 2 of room 1',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 3,
  //         name: 'Workplace 3 of room 1',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 4,
  //         name: 'Workplace 4 of room 1',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 2,
  //     workplaces: [
  //       {
  //         workplace_id: 5,
  //         name: 'Workplace 1 of room 2',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 6,
  //         name: 'Workplace 2 of room 2',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 3,
  //     workplaces: [
  //       {
  //         workplace_id: 7,
  //         name: 'Workplace 1 of room 3',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 8,
  //         name: 'Workplace 2 of room 3',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 4,
  //     workplaces: [
  //       {
  //         workplace_id: 9,
  //         name: 'Workplace 1 of room 4',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 10,
  //         name: 'Workplace 2 of room 4',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 11,
  //         name: 'Workplace 3 of room 4',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 12,
  //         name: 'Workplace 4 of room 4',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 5,
  //     workplaces: [
  //       {
  //         workplace_id: 13,
  //         name: 'Workplace 1 of room 5',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 14,
  //         name: 'Workplace 2 of room 5',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 15,
  //         name: 'Workplace 3 of room 5',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 6,
  //     workplaces: [
  //       {
  //         workplace_id: 16,
  //         name: 'Workplace 1 of room 6',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 17,
  //         name: 'Workplace 2 of room 6',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 18,
  //         name: 'Workplace 3 of room 6',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 7,
  //     workplaces: [
  //       {
  //         workplace_id: 19,
  //         name: 'Workplace 1 of room 7',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 20,
  //         name: 'Workplace 2 of room 7',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 21,
  //         name: 'Workplace 3 of room 7',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 22,
  //         name: 'Workplace 4 of room 7',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 8,
  //     workplaces: [
  //       {
  //         workplace_id: 23,
  //         name: 'Workplace 1 of room 8',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 24,
  //         name: 'Workplace 2 of room 8',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 25,
  //         name: 'Workplace 3 of room 8',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 26,
  //         name: 'Workplace 4 of room 8',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  //   {
  //     room_id: 9,
  //     workplaces: [
  //       {
  //         workplace_id: 27,
  //         name: 'Workplace 1 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 28,
  //         name: 'Workplace 2 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 29,
  //         name: 'Workplace 3 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 30,
  //         name: 'Workplace 4 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 31,
  //         name: 'Workplace 5 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 32,
  //         name: 'Workplace 6 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 33,
  //         name: 'Workplace 7 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 34,
  //         name: 'Workplace 8 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 35,
  //         name: 'Workplace 9 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 36,
  //         name: 'Workplace 10 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 37,
  //         name: 'Workplace 11 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 38,
  //         name: 'Workplace 12 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 39,
  //         name: 'Workplace 13 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 40,
  //         name: 'Workplace 14 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //       {
  //         workplace_id: 41,
  //         name: 'Workplace 15 of room 9',
  //         description: 'amazing',
  //         booking_price: 2005,
  //       },
  //     ],
  //   },
  // ];

  hideDialog() {
    this.workplaceDialog = false;
    this.changeDialogState.emit(false);
    this.submitted = false;
  }

  onDialogHide() {
    this.changeDialogState.emit(false);
  }

  addWorkplaces() {
    console.log(this.selectedWorkplaces);
    this.submitted = true;
    this.workplaceDialog = false;
    this.changeDialogState.emit(false);
    this.workplaceDataService.workplaces$.next(this.selectedWorkplaces);
  }

  isOutOfStock(data: any) {
    return data.workplace_id < 6;
  }

  toggleRoomSelection(room: any) {
    if (this.isRoomSelected(room)) {
      this.selectedWorkplaces = this.selectedWorkplaces.filter(
        (workplace: any) => !room.workplaces.includes(workplace)
      );
    } else {
      this.selectedWorkplaces = [
        ...this.selectedWorkplaces,
        ...room.workplaces.filter(
          (workplace: any) => !this.isOutOfStock(workplace)
        ),
      ];
    }

    console.log(this.selectedWorkplaces);
  }

  isRoomSelected(room: any): boolean {
    // Get the non-disabled workplaces in the room
    const nonDisabledWorkplaces = room.workplaces.filter(
      (workplace: any) => !this.isOutOfStock(workplace)
    );

    // Check if all non-disabled workplaces are selected
    const allNonDisabledSelected = nonDisabledWorkplaces.every(
      (workplace: any) => this.selectedWorkplaces.includes(workplace)
    );

    // The room is considered selected only if there are non-disabled workplaces and they are all selected
    return nonDisabledWorkplaces.length > 0 && allNonDisabledSelected;
  }

  areAllWorkplacesDisabled(room: any): boolean {
    return room.workplaces.every((workplace: any) =>
      this.isOutOfStock(workplace)
    );
  }
}
