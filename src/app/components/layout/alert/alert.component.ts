// import { Component } from '@angular/core';
// import { ToastModule } from 'primeng/toast';
// import { Button } from 'primeng/button';
// import { MessageService } from 'primeng/api';
// import { ProgressBarModule } from 'primeng/progressbar';
//
// @Component({
//   selector: 'app-alert',
//   standalone: true,
//   imports: [ToastModule, Button, ProgressBarModule],
//   templateUrl: './alert.component.html',
//   styleUrl: './alert.component.scss',
// })
// export class AlertComponent {
  // visible = false;

  // showConfirm() {
  //   // if (!this.visible) {
  //     this.messageService.add({
  //       key: 'confirm',
  //       severity: 'success',
  //       summary: 'Success',
  //       detail: 'Message Content',
  //       life: 1000,
  //     });
  //     // this.visible = true;
  //   // }
  // }

  // onReject() {
  //   this.messageService.clear();
    // this.visible = false;
  // }

  // value = 0;
  // interval: any;

  // constructor(
  //   private messageService: MessageService
  // ) {}

  // ngOnInit() {
  //   const duration = 2000; // total duration of 2 seconds
  //   const interval = 100;  // update every 100ms
  //   const increment = 100 / (duration / interval); // increment value for each update
  //
  //   console.log(increment);
  //   const progressInterval = setInterval(() => {
  //     this.value += increment;
  //     if (this.value >= 100) {
  //       this.value = 100;
  //       clearInterval(progressInterval);
  //     }
  //   }, interval);
  //
  //   clearInterval(this.interval);
  // }

  // ngOnDestroy() {
  //   if (this.interval) {
  //     clearInterval(this.interval);
  //   }
  // }
// }
