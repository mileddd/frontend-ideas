import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent, GlobalErrorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend-ideas');
}
