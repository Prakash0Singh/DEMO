import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;

  // url="http://159.89.164.11:3333/api/"
  // url="http://15.207.42.246:3333/api/"
  url="http://139.59.73.87:3333/api/"

  httpClient:any;

  constructor(private http: HttpClient, private httpBackend: HttpBackend) {
    this.httpClient = new HttpClient(this.httpBackend);
  }

  postTempUser(data: any) {
   
    return this.httpClient.post(this.url + 'add-tempUser', data);
  }
  postAddUser(data: any) {
    return this.httpClient.post(this.url + 'add-user', data);
  }
  postResendOtp(data: any) {
    return this.httpClient.post(this.url + 'resendotp', data);
  }
  login(data: any) {
    return this.httpClient.post(`${this.url}login`, data);
  }
  loginOtp(data: any) {
    return this.httpClient.post(this.url + 'login-otp', data);
  }
  forgotPassword(data: any) {
    return this.httpClient.post(`${this.url}forgotPassword`, data);
  }
  resetPassOtp(data: any) {
    return this.httpClient.post(`${this.url}matchCodeForReset`, data);
  }
  resetPassword(data: any) {
    return this.httpClient.post(`${this.url}resetpassword`, data);
  }
  googlelogin(data: any) {
    return this.httpClient.post(`${this.url}socialauthentication`, data);
  }
}
