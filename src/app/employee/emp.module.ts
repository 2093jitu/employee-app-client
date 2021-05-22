import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { EmpRoutingModule } from './emp-routing.module';
import { GradeComponent } from './grade/grade.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { EmpAccountComponent } from './emp-account/emp-account.component';
import { CompanyAccountComponent } from './company-account/company-account.component';
import { PaySalaryComponent } from './pay-salary/pay-salary.component';
import { SalarySheetComponent } from './salary-sheet/salary-sheet.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateGradeComponent } from './grade/update-grade/update-grade.component';
import { TranHistoryModalComponent } from './company-account/tran-history-modal/tran-history-modal.component';
import { TransferModalComponent } from './pay-salary/transfer-modal/transfer-modal.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [EmployeeComponent, GradeComponent, HomeComponent, NavComponent, EmpAccountComponent, CompanyAccountComponent, PaySalaryComponent, SalarySheetComponent, UpdateGradeComponent, TranHistoryModalComponent, TransferModalComponent, AccountBalanceComponent, FooterComponent],
  imports: [
    EmpRoutingModule,
    SharedModule
  ],
  exports: [
    EmployeeComponent
  ],

  entryComponents: [
    UpdateGradeComponent,
    TranHistoryModalComponent,
    TransferModalComponent
  ]



})

export class EmpModule { }
