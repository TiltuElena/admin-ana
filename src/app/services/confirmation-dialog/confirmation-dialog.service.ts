import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  constructor(private confirmationService: ConfirmationService) {}

  confirm(header: string, message: string, acceptCallback: () => void, rejectCallback?: () => void): void {
    this.confirmationService.confirm({
      header,
      message,
      accept: acceptCallback,
      reject: rejectCallback,
      key: 'uniqueidofdialog',
    });
  }
}
