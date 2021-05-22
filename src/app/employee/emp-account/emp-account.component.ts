import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpAccModel } from '../_core/model/emp-acc.model';
import { EmpAccService } from '../_core/service/emp-acc.service';
import { EmployeeService } from '../_core/service/employee.service';

@Component({
  selector: 'app-emp-account',
  templateUrl: './emp-account.component.html',
  styleUrls: ['./emp-account.component.css']
})
export class EmpAccountComponent implements OnInit {

  empAccModel: EmpAccModel = new EmpAccModel();
  empAccList: any = [];
  empList: any = [];

  constructor(
    private empAccService: EmpAccService, 
    private empService: EmployeeService, 
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.findEmpList();
    this.findEmpAccList();
  }

  findEmpList() {
    this.empService.findEmpList().subscribe(
      res => {
        if (res.success && res.items) {
          this.empList = res.items;
        }
      },
      err => {
        console.log('grade list err', err);
      }
    );
  }

  findEmpAccList() {
    this.empAccService.findEmpAccList().subscribe(
      res => {
        if (res.success && res.items) {
          this.empAccList = res.items;
        }
      },
      err => {
        console.log('grade list err', err);
      }
    );
  }

  changeAccType(event) {
    this.empAccModel.type = event.target.value;
  }

  editEmpAcc(empAcc) {
    this.empAccModel = empAcc;
  }

  saveOrUpdate(){
    if(this.empAccModel.id){
      this.updateEmpAcc();
    }else{
      this.createEmpAcc();
    }
  }

  createEmpAcc() {
    this.empAccService.createEmpAcc(this.empAccModel).subscribe(
      res => {
        if (res.success) {
          this.toastr.success(res.message);
          this.empAccModel = new EmpAccModel();
          this.findEmpAccList();
        } else {
          this.toastr.warning(res.message);
        }
      },
      err => {
        console.log('grade list err', err);
      }
    );
  }

  updateEmpAcc() {
    this.empAccService.updateEmpAcc(this.empAccModel).subscribe(
      res => {
        if (res.success) {
          this.toastr.success(res.message);
          this.empAccModel = new EmpAccModel();
          this.findEmpAccList();
        } else {
          this.toastr.warning(res.message);
        }
      },
      err => {
        console.log('grade list err', err);
      }
    );
  }


  deleteEmpAcc(emp) {
    this.empAccService.deleteEmpAcc(emp.id).subscribe(
      res => {
        if (res.success) {
          this.toastr.success(res.message);
          this.findEmpAccList();
        } else {
          this.toastr.warning(res.message);
        }
      },
      err => {
        console.log('grade list err', err);
      }
    );
  }

  onClickClear(){
    this.empAccModel = new EmpAccModel();
  }

}
