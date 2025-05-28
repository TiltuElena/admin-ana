import { Component, HostListener, ViewChild } from '@angular/core';
import { BookingSchemaComponent } from './components/booking-schema/booking-schema.component';
import { SchemaEditorComponent } from './components/schema-editor/schema-editor.component';
import { EditService } from './services/edit.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [BookingSchemaComponent, SchemaEditorComponent, TranslateModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  constructor(private editService: EditService) {}
  @ViewChild(SchemaEditorComponent)
  schemaEditorComponent!: SchemaEditorComponent;
  @ViewChild(BookingSchemaComponent)
  bookingSchemaComponent!: BookingSchemaComponent;

  svgClicked = false;

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const clickedInsideEditor = this.schemaEditorComponent.isClickInside(event);

    if (!clickedInsideEditor && !this.svgClicked) {
      this.schemaEditorComponent.workplace = null;
      this.schemaEditorComponent.room = null;

      this.editService.currentRoom$.next(null);
      this.editService.currentWorkplace$.next(null);
    }
    this.svgClicked = false;
  }

  onSvgClick() {
    this.svgClicked = true;
  }
}
