import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private END_POINT = `${environment.baseUrl}${environment.employeeApiUrl}/report`;
  private SALARY_SHEET= `${this.END_POINT}/salarySheet`;
  
  constructor(
    private http: HttpClient,
  ) { }


  salarysheetReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.SALARY_SHEET, _reqObj, httpOptions);
  }
  
}
