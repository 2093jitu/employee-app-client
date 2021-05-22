import { Component, OnInit } from '@angular/core';
import { CompanyAccountService } from '../_core/service/company-account.service';
import { EmpAccService } from '../_core/service/emp-acc.service';
import { EmployeeService } from '../_core/service/employee.service';
import { GradeService } from '../_core/service/grade.service';
import { TransactionService } from '../_core/service/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  conpanyAccList: any[] = [];
  transactionList: any[] = [];
  employeeList: any []= [];
  employeeAccList : any []=[]

  constructor(
    private _companyAccountService :CompanyAccountService,
    private _empAccService :EmpAccService,
    private _employeeService : EmployeeService,
    private _gradeService :GradeService,
    private _transactionService :TransactionService
  ) { }

  ngOnInit() {
    this.companyAccList();
    this.findEmpList();
  }

  companyAccList() {
    this._companyAccountService.getCompanyAccList({}).subscribe(
      res => {
        this.conpanyAccList = res.items ? res.items : [];
        if (this.conpanyAccList.length > 0) {
          this.getTranList({ comAccount: this.conpanyAccList[0] });
        }
      }
    );
  }

  getTranList(data: any) {
    this._transactionService.findByCompany(data).subscribe(
      res => {
        this.transactionList = res.items ? res.items : [];
      }
    );
  }

  totalPaid() {
    if (this.transactionList && this.transactionList.length > 0) {
      return this.transactionList.map(data1 => data1.drAmount).reduce((data2, data3) => { return data2 + data3 }, 0);
    }
    return 0;
  }

  currentBalance() {
    if (this.transactionList && this.transactionList.length > 0) {
      return this.transactionList.map(data1 => data1.crAmount).reduce((data2, data3) => { return data2 + data3 }, 0) - this.transactionList.map(data1 => data1.drAmount).reduce((data2, data3) => { return data2 + data3 }, 0);
    }
  }

  findEmpList() {
    this._employeeService.findEmpList().subscribe(
      res => {
        if (res.success && res.items) {
          this.employeeList = res.items;
        }
      },
      err => {
        console.log('grade list err', err);
      }
    );
  }

  totalSalary() {
    return this.employeeList.map(data => data.grade.salary).reduce((data2, data3) => { return data2 + data3 }, 0);
  }

  getEmpAccount() {
    this._empAccService.findEmpAccList().subscribe(
      res => {
        this.employeeAccList = res.items ? res.items : [];
      }
    );
  }  

  totalDrAmmount() {
    if (this.transactionList && this.transactionList.length > 0) {
      return this.transactionList.map(data1 => data1.drAmount).reduce((data2, data3) => { return data2 + data3 }, 0);
    }
    return 0;
  }

  totalCrAmmount() {
    if (this.transactionList && this.transactionList.length > 0) {
      return this.transactionList.map(data1 => data1.crAmount).reduce((data2, data3) => { return data2 + data3 }, 0);
    }
    return 0;
  }


  //need to taranasfer
  needToTransfer() { 
     return this.totalSalary() - this.transactionList.filter(data => data.empAccount).map(data1 => data1.drAmount).reduce((data2, data3) => { return data2 + data3 }, 0);    
  }

  

 


}
