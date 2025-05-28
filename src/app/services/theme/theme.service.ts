import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'app-theme';

  switchTheme(theme: string) {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = theme + '.css';
    }
    localStorage.setItem(this.themeKey, theme);
  }

  getSavedTheme(): string | null {
    return localStorage.getItem(this.themeKey);
  }

  applySavedTheme() {
    const savedTheme = this.getSavedTheme();
    if (savedTheme) {
      this.switchTheme(savedTheme);
    } else {
      this.switchTheme('light');
    }
  }
}
