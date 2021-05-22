import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpAccService {

  private END_POINT = `${environment.baseUrl}${environment.employeeApiUrl}/employee-account`;
  private CREATE_EMPLOYEE_ACC = `${this.END_POINT}/create`;
  private UPDATE_EMPLOYEE_ACC = `${this.END_POINT}/update`;
  private FIND_EMPLOYEE_ACC_LIST = `${this.END_POINT}/list`;
  private DELETE_EMPLOYEE_ACC = `${this.END_POINT}/delete`;

  constructor(private http: HttpClient) { }

  createEmpAcc(reqObj: any): Observable<any> {
    return this.http.post(this.CREATE_EMPLOYEE_ACC, reqObj).pipe(map((data: any) => data));
  }

  updateEmpAcc(reqObj: any): Observable<any> {
    return this.http.put(this.UPDATE_EMPLOYEE_ACC, reqObj).pipe(map((data: any) => data));
  }

  findEmpAccList(): Observable<any> {
    return this.http.get(this.FIND_EMPLOYEE_ACC_LIST).pipe(map((data: any) => data));
  }

  deleteEmpAcc(empId: any): Observable<any> {
    return this.http.delete(this.DELETE_EMPLOYEE_ACC, {params:new HttpParams().set('id', empId)}).pipe(map((data: any) => data));
  }

}
