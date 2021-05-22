import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../_core/service/employee.service';
import { GradeService } from '../_core/service/grade.service';

@Component({
  selector: 'app-salary-sheet',
  templateUrl: './salary-sheet.component.html',
  styleUrls: ['./salary-sheet.component.css']
})
export class SalarySheetComponent implements OnInit {


  employeeList: any = [];

  constructor(
    private gradeService: GradeService,
    private employeeService: EmployeeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.findEmpList();
  }

  findEmpList() {
    this.employeeService.findEmpList().subscribe(
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

}
