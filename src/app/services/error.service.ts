// src/app/services/error.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type AlertType = 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private alertSubject = new Subject<{ message: string; type: AlertType }>();
  alert$: Observable<{ message: string; type: AlertType }> = this.alertSubject.asObservable();

  showError(message: string) {
    this.alertSubject.next({ message, type: 'error' });
  }

  showSuccess(message: string) {
    this.alertSubject.next({ message, type: 'success' });
  }
}
