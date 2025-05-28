import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSchemaComponent } from './booking-schema.component';

describe('BookingSchemaComponent', () => {
  let component: BookingSchemaComponent;
  let fixture: ComponentFixture<BookingSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSchemaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
