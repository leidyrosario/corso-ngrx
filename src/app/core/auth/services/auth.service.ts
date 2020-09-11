import { environment } from "./../../../../environments/environment";
import { Auth } from "./../../../model/auth";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string) {
        return this.http.get<Auth>(`${environment.BASE_API}/signin`);
    }

    saveAuth(auth: Auth) {
        localStorage.setItem('token', auth.accessToken);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    cleanAuth() {
        localStorage.removeItem('token');
    }

}
