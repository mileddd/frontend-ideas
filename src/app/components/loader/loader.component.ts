import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone : true,
  imports : [CommonModule],
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
