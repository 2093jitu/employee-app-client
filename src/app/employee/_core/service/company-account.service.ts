import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyAccountService {

  private END_POINT = `${environment.baseUrl}${environment.employeeApiUrl}/company-account`;
  private CREATE_COMPANY_ACC_URL = `${this.END_POINT}/create`;
  private COMPANY_ACC_LIST_URL = `${this.END_POINT}/list`;


  constructor(private http: HttpClient) { }

  createCompanyAccount(reqObj: any): Observable<any> {
    return this.http.post(this.CREATE_COMPANY_ACC_URL, reqObj).pipe(map((data: any) => data));
  }

  getCompanyAccList(reqObj: any): Observable<any> {
    return this.http.get(this.COMPANY_ACC_LIST_URL, reqObj).pipe(map((data: any) => data));
  }

}
