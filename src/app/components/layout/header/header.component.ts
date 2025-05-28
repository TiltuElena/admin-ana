import { Component } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../services/theme/theme.service';
import { MenuModule } from 'primeng/menu';
import { Button } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatMenuItem } from '@angular/material/menu';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { PageRoutes } from '../../../shared/enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToggleButtonModule,
    CommonModule,
    FormsModule,
    MenuModule,
    Button,
    TranslateModule,
    MatMenuItem,
    AvatarModule,
    ToolbarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService,
    private router: Router
  ) {}
  checked = false;
  items: any = [];
  user_info: any = [];

  languages = [
    { code: 'ro', label: 'RO', imgSrc: 'assets/images/ro-flag.png' },
    { code: 'en', label: 'EN', imgSrc: 'assets/images/uk-flag.png' },
    { code: 'ru', label: 'РУС', imgSrc: 'assets/images/ru-flag.png' },
  ];

  ngOnInit() {
    // this.themeService.applySavedTheme();
    this.checked = this.themeService.getSavedTheme() === 'dark';

    this.items = this.languages.map((language) => ({
      label: language.label,
      command: () => this.logLanguage(language.code),
      icon: language.imgSrc,
    }));

    this.user_info = [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        command: () => {
          this.router.navigate([PageRoutes.Settings]).then();
        },
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.router.navigate([PageRoutes.Login]).then();
        },
      },
    ];
  }

  changeTheme() {
    const theme = this.checked ? 'dark' : 'light';
    this.themeService.switchTheme(theme);
  }

  selectedLanguage: string = localStorage.getItem('lang') || 'ro';
  languageImg =
    this.languages.find((lang) => lang.code === this.selectedLanguage) ||
    this.languages[0];

  logLanguage(language: string) {
    this.selectedLanguage = language;
    this.languageImg =
      this.languages.find((lang) => lang.code === this.selectedLanguage) ||
      this.languages[0];

    localStorage.setItem('lang', language);
    this.translateService.use(language);
  }
}
