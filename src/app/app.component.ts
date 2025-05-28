import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingSchemaComponent } from './pages/booking/components/booking-schema/booking-schema.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { ThemeService } from './services/theme/theme.service';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  imports: [RouterModule, BookingSchemaComponent, HeaderComponent, ToastModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin-booking';

  constructor(private themeService: ThemeService) {}
  ngOnInit(): void {
    this.themeService.applySavedTheme();
  }
}
