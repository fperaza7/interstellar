import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public status: string = '';
  public fieldTextType: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: any): void {
    this.authService.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/home');
    },
    error => {
        this.status = 'error';
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
