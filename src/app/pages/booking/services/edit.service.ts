import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { RoomService } from '../../../api/modules/room.service';
import {Room} from '../../../shared/interfaces/room';
import {Workplace} from '../../../shared/interfaces/workplace';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  // rooms$: Observable<Room[]>;
  rooms$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  currentWorkplace$: BehaviorSubject<Workplace | null> = new BehaviorSubject<Workplace | null>(null);
  currentRoom$: BehaviorSubject<Room | null> = new BehaviorSubject<Room | null>(null);
  currentRoomId$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private roomService: RoomService) {
    // this.rooms$ = this.roomService.getAll().pipe(map((response: any) => response.data));

    this.roomService.getAll()
      .pipe(
        map((response: any) => response.data)
      )
      .subscribe((data: any[]) => {
        // Update the BehaviorSubject with new data
        this.rooms$.next(data);
      });
    // this.roomService.getAllLocal()
    //   .subscribe((data: any[]) => {
    //     // Update the BehaviorSubject with new data
    //     this.rooms$.next(data);
    //   });
  }

  updateWorkplacePosition(
    workplaceId: number,
    position_x: number,
    position_y: number
  ) {
    const rooms = this.rooms$.getValue();
    const room = rooms.find(
      (room) => room.id === this.currentRoomId$.getValue()
    );
    console.log(room);
    console.log(workplaceId);

    if (room) {
      const workplace = room.workplaces.find(
        (workplace: Workplace) => workplace.id === workplaceId
      );

      if (workplace) {
        workplace.position_x = position_x.toString();
        workplace.position_y = position_y.toString();
        this.rooms$.next([...rooms]);
        // Optionally, persist the update to the server
        // this.roomService.updateRoom(room).subscribe();
      }

      console.log(workplace);
    }
  }

  updateTemporaryWorkplace(workplaceId: number, updatedValues: Partial<any>) {
    const rooms = this.rooms$.getValue();
    const room = rooms.find(room => room.id === this.currentRoomId$.getValue());

    if (room) {
      const workplace = room.workplaces.find((w: Workplace) => w.id === workplaceId);

      if (workplace) {
        Object.entries(updatedValues).forEach(([key, value]) => {
          if (key === 'name') {
            workplace.name_en = value;
          } else if (key === 'description') {
            workplace.description_en = value;
          } else if (key in workplace) {
            (workplace as any)[key] = value;
          }
        });

        workplace.isTemporary = true;
        this.rooms$.next([...rooms]);
      }
    }
  }

  addNewWorkplaceTemp(formData: any) {
    const rooms = this.rooms$.getValue();

    let newWorkplace: Workplace | null = null;

    const updatedRooms = rooms.map((room) => {
      if (room.id === formData.room_id) {
        newWorkplace = {
          id: formData.id,
          name_en: formData.name,
          name_ro: formData.name,
          name_ru: formData.name,
          position_x: formData.position_x,
          position_y: formData.position_y,
          booking_price: formData.booking_price,
          description_en: formData.description,
          description_ro: formData.description,
          description_ru: formData.description,
          room_id: formData.room_id,
          bookings: [],
          isTemporary: true,
          isNew: true
        };

        return {
          ...room,
          workplaces: [...room.workplaces, newWorkplace]
        };
      }

      return room;
    });

    this.currentRoomId$.next(formData.room_id);

    if (newWorkplace) {
      this.currentWorkplace$.next(newWorkplace);
    }

    this.rooms$.next(updatedRooms);
  }

  deleteWorkplaceTemp(workplaceId: number) {
    const rooms = this.rooms$.getValue();
    const roomId = this.currentRoomId$.getValue();
    const room = rooms.find(r => r.id === roomId);

    if (room) {
      room.workplaces = room.workplaces.filter((wp: any) => wp.id !== workplaceId);
      this.rooms$.next([...rooms]);
      this.currentWorkplace$.next(null);
    }
  }

  changeWorkplaceIsTemp(workplaceId: number) {
    const rooms = this.rooms$.getValue();
    const roomId = this.currentRoomId$.getValue();
    const room = rooms.find(r => r.id === roomId);
    const isTemporary = false;

    if (room) {
      const workplace = room.workplaces.find((wp: any) => wp.id === workplaceId);
      if (workplace) {
        workplace.isTemporary = isTemporary;
        this.rooms$.next([...rooms]);
        const current = this.currentWorkplace$.getValue();
        if (current?.id === workplaceId) {
          this.currentWorkplace$.next({...current, isTemporary } as Workplace); // Explicitly cast here
        }
      }
    }
  }
}
