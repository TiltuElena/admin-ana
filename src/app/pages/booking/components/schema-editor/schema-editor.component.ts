import { Component, ElementRef } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { EditService } from '../../services/edit.service';
import { BehaviorSubject, distinctUntilChanged, Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AsyncPipe } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

import { ConfirmationDialogService } from '../../../../services/confirmation-dialog/confirmation-dialog.service';
import { Ripple } from 'primeng/ripple';
import { TranslateModule } from '@ngx-translate/core';
import { WorkplaceService } from '../../../../api/modules/workplace.service';
import { RoomService } from '../../../../api/modules/room.service';
import {Room} from '../../../../shared/interfaces/room';

@Component({
  selector: 'app-schema-editor',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    CardModule,
    InputNumberModule,
    PrimeTemplate,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AsyncPipe,
    DropdownModule,
    Ripple,
    TranslateModule
  ],
  templateUrl: './schema-editor.component.html',
  styleUrl: './schema-editor.component.scss',
})
export class SchemaEditorComponent {
  currentWorkplace$: BehaviorSubject<any>;
  currentRoom$: BehaviorSubject<any>;
  currentRoomSubscription!: Subscription;
  currentWorkplaceSubscription!: Subscription;
  formChangesSubscription!: Subscription;
  workplaceForm: FormGroup;
  roomForm: FormGroup;

  workplace: any | null = null;
  room: any | null = null;
  isEditing = false;

  floorNumbers: { label: string; value: number }[] = [
    { label: '0', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];

  constructor(
    private editService: EditService,
    private fb: FormBuilder,
    private eRef: ElementRef,
    private confirmationDialogService: ConfirmationDialogService,
    private messageService: MessageService,
    private workplaceService: WorkplaceService,
    private roomService: RoomService,
  ) {
    this.currentWorkplace$ = this.editService.currentWorkplace$;
    this.currentRoom$ = this.editService.currentRoom$;

    this.workplaceForm = this.fb.group({
      booking_price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      name: ['', [Validators.required]],
      position_x: ['', [Validators.required]],
      position_y: ['', [Validators.required]],
      room_id: ['', [Validators.required]]
    });

    this.roomForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      area: ['', [Validators.required]],
      length: ['', [Validators.required]],
      width: ['', [Validators.required]],
      floor_number: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentWorkplaceSubscription = this.currentWorkplace$.subscribe(
      (workplace: any) => {
        if (workplace) {
          console.log(workplace);
          this.workplaceForm.patchValue(
            {
              booking_price: workplace.booking_price,
              description: workplace.description_en,
              name: workplace.name_en,
              position_x: workplace.position_x,
              position_y: workplace.position_y,
              room_id: workplace.room_id,
            },
            { emitEvent: false }
          );

          this.workplace = workplace;
          this.room = null;
          this.isEditing = true;
        }
      }
    );

    this.currentRoomSubscription = this.currentRoom$.subscribe((room: Room) => {
      if (room) {
        this.roomForm.patchValue(
          {
            name: room.name_en,
            description: room.description_en,
            area: room.area,
            length: room.length,
            width: room.width,
            floor_number: room.floor_number || 3,
          },
          { emitEvent: false }
        );

        this.room = room;
        this.workplace = null;
        this.isEditing = true;
      }
    });

    this.formChangesSubscription = this.workplaceForm.valueChanges
      .pipe(
        distinctUntilChanged((prev, curr) =>
          JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((values) => {
        this.editService.updateTemporaryWorkplace(this.workplace!.id, values);
      });
  }

  public isClickInside(event: Event): boolean {
    const target = event.target as HTMLElement;
    return this.eRef.nativeElement.contains(target);
  }

  editRoom() {
    if (this.roomForm.valid) {
      this.confirmationDialogService.confirm(
        'Are you sure you want to edit the room',
        `${this.currentRoom$.getValue().name_en}?`,
        () => {
          console.log(this.roomForm.getRawValue(), this.currentRoom$.getValue().id);
          const roomData = {
            name_en:  this.roomForm.getRawValue().name,
            description_en:  this.roomForm.getRawValue().description,
            width: this.roomForm.getRawValue().width,
            length: this.roomForm.getRawValue().length,
            area: this.roomForm.getRawValue().area,
          }
          this.roomService.editById(this.currentRoom$.getValue().id, roomData).subscribe()

          this.room = null;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Room ${
              this.currentRoom$.getValue().name_en
            } successfully edited!`,
            life: 3000,
          });
        },
        () => {
          console.log('Room editing canceled');
        }
      );
    } else {
      console.log('Form is invalid');
      this.roomForm.markAllAsTouched();
    }
  }

  editWorkplace() {
    if (this.workplaceForm.valid) {
      this.confirmationDialogService.confirm(
        'Are you sure you want to edit the workplace',
        `${this.currentWorkplace$.getValue().name_en}?`,
        () => {

          const workplaceData = {
            room_id: this.currentWorkplace$.getValue().room_id,
            name_en: this.currentWorkplace$.getValue().name_en,
            name_ro: this.currentWorkplace$.getValue().name_ro,
            name_ru: this.currentWorkplace$.getValue().name_ru,
            description_en: this.currentWorkplace$.getValue().description_en,
            description_ro: this.currentWorkplace$.getValue().description_ro,
            description_ru: this.currentWorkplace$.getValue().description_ru,
            position_x: this.currentWorkplace$.getValue().position_x,
            position_y: this.currentWorkplace$.getValue().position_y,
            booking_price: this.currentWorkplace$.getValue().booking_price,
          }

          this.workplaceService.updateById(this.currentWorkplace$.getValue().id, workplaceData).subscribe()
          this.editService.changeWorkplaceIsTemp(this.currentWorkplace$.getValue().id)
          this.workplace = null;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Workplace ${
              this.currentWorkplace$.getValue().name_en
            } successfully edited!`,
            life: 3000,
          });
        },
        () => {
          console.log('Workplace editing canceled');
        }
      );
    } else {
      console.log('Form is invalid');
      this.workplaceForm.markAllAsTouched();
    }
  }

  // deleteRoom() {
  //   this.confirmationDialogService.confirm(
  //     'Are you sure you want to delete the room',
  //     `${this.currentRoom$.getValue().name_en}?`,
  //     () => {
  //       console.log('delete room');
  //
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Success',
  //         detail: `Room ${
  //           this.currentRoom$.getValue().name_en
  //         } successfully deleted!`,
  //         life: 3000,
  //       });
  //     },
  //     () => {
  //       console.log('Room deletion canceled');
  //     }
  //   );
  // }

  deleteWorkplace() {
    this.confirmationDialogService.confirm(
      'Are you sure you want to delete the workplace',
      `${this.currentWorkplace$.getValue().name_en}?`,
      () => {
        console.log('delete workplace');
        console.log(this.currentWorkplace$.getValue().id);
        this.workplaceService.deleteById(this.currentWorkplace$.getValue().id).subscribe()
        this.editService.deleteWorkplaceTemp(this.currentWorkplace$.getValue().id)
        this.editService.changeWorkplaceIsTemp(this.currentWorkplace$.getValue().id)

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Workplace ${
            this.currentWorkplace$.getValue().name_en
          } successfully edited!`,
          life: 3000,
        });
      },
      () => {
        console.log('Workplace deletion canceled');
      }
    );
  }

  addWorkplace() {
    this.room = null;
    this.isEditing = false;
    this.workplace = {
      id: Date.now(),
      booking_price: 0,
      description: 'test description',
      name: 'test name',
      position_x: 25,
      position_y: 25,
      room_id: 1,
      bookings: [],
    };

    this.workplaceForm.patchValue({
      booking_price: 0,
      description: 'test description',
      name: 'test name',
      position_x: 25,
      position_y: 25,
    });

    this.editService.addNewWorkplaceTemp(this.workplace);
  }

  createWorkplace() {
    console.log('added workplace');

    const workplaceData = {
      room_id: this.currentWorkplace$.getValue().room_id,
      name_en: this.currentWorkplace$.getValue().name_en,
      name_ro: this.currentWorkplace$.getValue().name_ro,
      name_ru: this.currentWorkplace$.getValue().name_ru,
      description_en: this.currentWorkplace$.getValue().description_en,
      description_ro: this.currentWorkplace$.getValue().description_ro,
      description_ru: this.currentWorkplace$.getValue().description_ru,
      position_x: this.currentWorkplace$.getValue().position_x,
      position_y: this.currentWorkplace$.getValue().position_y,
      booking_price: this.currentWorkplace$.getValue().booking_price,
    }

    this.workplaceService.createWorkplace(workplaceData).subscribe();
    this.editService.changeWorkplaceIsTemp(this.currentWorkplace$.getValue().id)

    this.workplace = null;

    this.workplaceForm.patchValue({
      booking_price: '',
      description: '',
      name: '',
      position_x: '',
      position_y: '',
      room_id: ''
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `Workplace ${
        this.currentWorkplace$.getValue().name_en
      } successfully created!`,
      life: 3000,
    });
  }

  ngOnDestroy(): void {
    if (this.currentRoomSubscription) {
      this.currentRoomSubscription.unsubscribe();
    }
    if (this.currentWorkplaceSubscription) {
      this.currentWorkplaceSubscription.unsubscribe();
    }
  }
}
