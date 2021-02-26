import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Spacecraft } from '../models/spacecraft';

@Injectable({
  providedIn: 'root'
})
export class SpacecraftService {
  private API_URL: string;

  constructor(public httpClient: HttpClient) {
    this.API_URL = GLOBAL.API_URL;
  }

  getSpacecrafts(token: string, page: number = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.httpClient.get(`${this.API_URL}/spacecrafts/${page}/pagination`, { headers });
  }

  getSpacecraftById(token: string, id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.httpClient.get(`${this.API_URL}/${id}`, { headers });
  }

  createSpacecraft(token: string, spacecraft: Spacecraft): Observable<any> {
    let params = JSON.stringify(spacecraft);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.httpClient.post(`${this.API_URL}/spacecrafts`, params, { headers });
  }

  updateSpacecraft(token: string, spacecraft: Spacecraft): Observable<any> {
    let params = JSON.stringify(spacecraft);
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.httpClient.put(`${this.API_URL}/spacecrafts/${spacecraft._id}`, params, { headers });
  }

  deleteSpacecraft(token: string, id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.httpClient.delete(`${this.API_URL}/spacecrafts/${id}`, { headers });
  }



}
