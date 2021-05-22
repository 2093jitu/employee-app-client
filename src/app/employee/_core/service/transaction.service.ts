import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private END_POINT = `${environment.baseUrl}${environment.employeeApiUrl}/transaction`;
  private CREATE_TRANSACTION_URL = `${this.END_POINT}/create`;
  private FIND_BY_COMPANY_ID_URL = `${this.END_POINT}/find-by-com-id`;


  constructor(private http: HttpClient) { }

  createTransaction(reqObj: any): Observable<any> {
    return this.http.post(this.CREATE_TRANSACTION_URL, reqObj).pipe(map((data: any) => data));
  }

  findByCompany(reqObj: any): Observable<any> {
    return this.http.get(this.FIND_BY_COMPANY_ID_URL, reqObj).pipe(map((data: any) => data));
  }

}
