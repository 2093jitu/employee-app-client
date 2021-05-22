import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyAccountService } from '../_core/service/company-account.service';
import { TransactionService } from '../_core/service/transaction.service';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {

  conpanyAccList: any[] = [];
  transactionList: any[] = [];

  constructor(
    private _companyAccountService: CompanyAccountService,
    private _transactionService: TransactionService,
    private _tosterService: ToastrService,
    private _modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.companyAccList();
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



}
