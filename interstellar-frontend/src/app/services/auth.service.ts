import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response';
import { tap } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { GLOBAL } from './global';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string;
  private authSubject = new BehaviorSubject(false);
  private token: string;
  private userData: User;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.API_URL = GLOBAL.API_URL;
  }

  register(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.API_URL}/auth/signup`, user)
      .pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            //this.saveToken(res.accessToken);
            //this.saveUser(res.user);
            return true;

          }
        }
      ));
  }

  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(`${this.API_URL}/auth/signin`, user)
      .pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            this.saveToken(res.accessToken);
            this.saveUser(res.user);
          }
        }
      ));
  }

  logout() {
    this.token = null;
    this.userData = null;
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_DATA");
    this.router.navigate(['/auth/login']);
  }

  saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  saveUser(user: any): void {
    localStorage.setItem("USER_DATA", JSON.stringify(user));
    this.userData = user;
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  getUser(): User {
    if (!this.userData) {
      this.userData = JSON.parse(localStorage.getItem('USER_DATA'));
    }
    return this.userData;
  }

  isAdmin(): Boolean {
    return this.userData.roles.find((role) => role.name === 'admin') ? true : false;
  }

  isUser(): Boolean {
    return this.userData.roles.find((role) => role.name === 'user') ? true : false;
  }

  isPilot(): Boolean {
    return this.userData.roles.find((role) => role.name === 'pilot') ? true : false;
  }
}
