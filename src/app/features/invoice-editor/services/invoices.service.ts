import { environment } from "./../../../../environments/environment";
import { Injectable } from '@angular/core';
import { Invoice } from 'src/app/model/invoice';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InvoicesService {
    constructor(private http: HttpClient) {}
    loadInvoices() {
        return this.http.get<Invoice[]>(`${environment.BASE_API}/invoices`);
    }

    deleteInvoice(id: number) {
        return this.http.delete(`${environment.BASE_API}/invoices/${id}`);
    }


    addInvoice(invoice: Invoice) {
        return this.http.post(`${environment.BASE_API}/invoices`, invoice);
    }

    editInvoice(invoice: Partial<Invoice>) {
        return this.http.patch(`${environment.BASE_API}/invoices/${invoice.id}`, invoice);
    }
}
