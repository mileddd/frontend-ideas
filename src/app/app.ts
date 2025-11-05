import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { Profile } from './components/profile/profile';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent, GlobalErrorComponent, Profile, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend-ideas');
  isLoginRoute = false;

  constructor(private router: Router,private loginService: LoginService) {
    this.isLoginRoute = this.router.url.startsWith('/login');

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginRoute = event.urlAfterRedirects.startsWith('/login');
      });
  }

  ngOnInit(): void {
    this.loginService.getUserInfo().subscribe({
      next: (data) => this.loginService.currentUser.next(data),
      error: (err) => console.error(err)
    });
  }
}
