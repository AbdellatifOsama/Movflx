import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
  Register(form:FormGroup):Observable<any>{
    return this._HttpClient.post("https://localhost:7224/api/Account/Register",form.value)
  }
  Login(form:FormGroup):Observable<any>{
    return this._HttpClient.post("https://localhost:7224/api/Account/Login",form.value)
  }
}
