import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone : false,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private loginService: LoginService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      console.log('Form Values:', this.loginForm.value);
      this.sha256(password).then(hashedPassword => {
        this.loginService.loginUser({
        username: username,
        password: hashedPassword
      }).subscribe({
          next: (res) => {
            sessionStorage.setItem('token',res.token);
            this.router.navigateByUrl('/ideas-list');
          },
          error: (err) => {
            this.errorService.showError(err.error?.error);
          }
        });
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  get f() {
    return this.loginForm.controls;
  }
}
