import { Observable } from "rxjs";
import { environment } from "./../../../../environments/environment";
import { Client } from "./../../../model/client";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientService {
    constructor(private http: HttpClient) {}

    loadClients(): Observable<Client[]> {
       return this.http.get<Client[]>(`${environment.BASE_API}/clients`);
    }

    addClient(client: Client): Observable<Client> {
       return this.http.post<Client>(`${environment.BASE_API}/clients`, client);

    }

    editClient(client: Client): Observable<Client> {
       return this.http.patch<Client>(`${environment.BASE_API}/clients/${client.id}`, client);

    }

    deleteClient(client: Client): Observable<any> {
       return this.http.delete<any>(`${environment.BASE_API}/clients/${client.id}`);
    }
}
