import { Component, EventEmitter, Output } from '@angular/core';
import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { EditService } from '../../services/edit.service';
import { RoomService } from '../../../../api/modules/room.service';
import {Workplace} from '../../../../shared/interfaces/workplace';
import {Room} from '../../../../shared/interfaces/room';

@Component({
  selector: 'app-booking-schema',
  standalone: true,
  imports: [
    DragDropModule,
    FormsModule,
    CommonModule,
    InputNumberModule,
    ButtonDirective,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './booking-schema.component.html',
  styleUrl: './booking-schema.component.scss',
})
export class BookingSchemaComponent {
  rooms$: BehaviorSubject<any>
  // rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // rooms$: Observable<any>

  @Output() svgClick = new EventEmitter<void>();

  onSvgClick() {
    this.svgClick.emit();
  }

  constructor(
    private editService: EditService,
    private roomService: RoomService
  ) {
    this.rooms$ = this.editService.rooms$;
    // this.rooms$ = this.roomService
    //   .getAll()
    //   .pipe(map((response: any) => response.data));
  }

  selectWorkplace(workplace: Workplace, room: Room): void {
    this.editService.currentWorkplace$.next(workplace);
    this.editService.currentRoom$.next(null);
    this.editService.currentRoomId$.next(room.id);
    // console.log(workplace);
  }

  selectRoom(room: any) {
    this.editService.currentRoom$.next(room);
    this.editService.currentWorkplace$.next(null);
  }

  // trackByWorkplaceId(index: number, workplace: any): number {
  //   return workplace.id;
  // }

  getRoomPath(roomId: number): string {
    // Return the corresponding SVG path for each room
    switch (roomId) {
      case 1:
        return 'M10.972698,15.118235q118.397111-1.345422,118.397111-.672711t-.672712,135.887593h-117.724399v-135.214882Z';
      case 2:
        return 'M137.442339,15.118235h67.943794v135.214882h-68.616507l.672713-135.214882Z';
      case 3:
        return 'M214.131376,15.118235h57.853134l.67271,135.214882h-59.198555l.672711-135.214882Z';
      case 4:
        return 'M347.657418,15.118235l126.432407-.772432.820989,135.987314h-127.253396v-135.214882Z';
      case 5:
        return 'M214.131378,237.56025h44.412014l.749846,55.488642h79.333296v103.47882l-125.167869,1.499693.672713-160.467155Z';
      case 6:
        return 'M347.657419,293.048894h84.100519l.749847-55.488642h41.582041v160.467166l-126.432409-.000011q.000005-104.978512.000002-104.978513Z';
      case 7:
        return 'M496.244739,154.750142v-139.631907c62.884616-1.736879,174.04272,18.761557,223.454263,39.479464L673.958363,184.321147c-41.887849-20.505619-128.746438-30.909421-177.713624-29.571005Z';
      case 8:
        return 'M683.706369,191.070729L731.696546,59.096778c55.332761,15.873988,148.095708,70.718011,190.461017,106.249302l-88.48189,111.206187c-32.324677-28.998495-106.863423-72.248871-149.969304-85.481538Z';
      case 9:
        return 'M775.937491,571.991798l339.307723-159.497206c43.057243,65.35936,76.723899,209.121075,71.608169,288.470807L808.18089,703.964785c-10.355779-89.439361-28.412436-119.656974-32.243399-131.972987Z';
      default:
        return '';
    }
  }

  getWorkplaceStatus(workplace: any) {
    return {
      selected: this.editService.currentWorkplace$.getValue()?.id == workplace.id,
      temporary: workplace?.isTemporary == true
    };
  }

  getRoomStatus(roomId: number) {
    return {
      selected: this.editService.currentRoom$.getValue()?.id == roomId,
    };
  }
}
