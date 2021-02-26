import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public status: string = '';
  public message: string = '';
  public fieldTextType: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form: any): void {
    this.authService.register(form.value).subscribe(res => {
      this.status = 'success';
    },
      error => {
        this.status = 'error';
        this.message = error.error.message;
      })
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
