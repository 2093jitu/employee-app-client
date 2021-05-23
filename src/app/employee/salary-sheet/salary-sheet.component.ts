import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../_core/service/employee.service';
import { GradeService } from '../_core/service/grade.service';
import { ReportServiceService } from '../_core/service/report-service.service';
import { UtilsService } from '../_core/service/utils.service.service';

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
    private reportServiceService: ReportServiceService,
    private coreUtilService: UtilsService,
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
  salarysheetReport(){
    const reqObj={}
    this.reportServiceService.salarysheetReport(reqObj).subscribe(
      res => {
        // this.printBtn = false;
        let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        // this.removeLoader();
      },
      err => {
        console.log(" Error occured in Registration card generation..", err);
        // this.printBtn = false;
        //     this.removeLoader();
      }
    )
  }
}
