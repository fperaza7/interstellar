import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public userData;
  constructor(
    public authService: AuthService
  ) {
    this.userData = this.authService.getUser();
  }

  ngOnInit(): void {
  }

  getFirstName() {
    return this.userData.name.split(" ")[0];
  }
}
