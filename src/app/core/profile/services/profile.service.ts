import { environment } from './../../../../environments/environment';
import { User } from './../../../model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

    constructor(private http: HttpClient) {}

    load() {
        return this.http.get<User>(`${environment.BASE_API}/profile`);
    }

    edit(user: User) {
        return this.http.patch<User>(`${environment.BASE_API}/profile`, user);
    }

}
