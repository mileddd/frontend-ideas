import { Component } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone : true,
  imports : [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  user: any = null;

  constructor(private loginService: LoginService,private router: Router) {}

  ngOnInit() {
    this.loginService.currentUser.subscribe(response =>{
      if( response )
      {
        this.user = response;
      }
    });
  }

  logout()
  {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
