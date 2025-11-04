import { Component } from '@angular/core';
import { ErrorService, AlertType } from '../../services/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-error',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './global-error.component.html',
})
export class GlobalErrorComponent {
  message: string | null = null;
  type: AlertType = 'error';

  constructor(private errorService: ErrorService) {
    this.errorService.alert$.subscribe(({ message, type }) => {
      this.message = message;
      this.type = type;
      setTimeout(() => (this.message = null), 3000);
    });
  }
}
