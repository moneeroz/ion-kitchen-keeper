import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL: string = 'http://localhost:2828/api';

  constructor(private http: HttpClient) {}

  registerUser(formData: any) {
    return this.http.post<Iuser>(this.apiURL + '/register', formData);
  }

  loginUser(formData: any) {
    return this.http.post<Iuser>(this.apiURL + '/login', formData);
  }

  getUserData() {
    const data = localStorage.getItem('currentUser');

    return data ? JSON.parse(data) : null;
  }

  isAuthenticated() {
    return this.getUserData() !== null ? true : false;
  }
}
