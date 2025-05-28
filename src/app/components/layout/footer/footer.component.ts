import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ToolbarModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
    socials: any = []

  ngOnInit(){
      this.socials = [
        {
          icon: "pi pi-facebook",
          url: "https://www.facebook.com/nortek.md/"
        },
        {
          icon: "pi pi-instagram",
          url: "https://www.instagram.com/nortek_md?igsh=MWgxazh1b2ZscXBzNA=="
        },
        {
          icon: "pi pi-globe",
          url: "https://www.nortek.md/"
        },
      ]
  }

  navigateToUrl(url: string) {
    window.open(url, '_blank');
  }

}
