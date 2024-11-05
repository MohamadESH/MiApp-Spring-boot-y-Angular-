import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'

})
export class ToastService {

  private messageService=inject(MessageService)

  showSuccess(msg:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
}

showError(msg:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
}

showConfirm(msg:string){
  this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: msg  });

}
}
