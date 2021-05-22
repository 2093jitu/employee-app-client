import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CompanyAccountModel } from '../_core/model/company-account.model';
import { TransactionModel } from '../_core/model/transaction.model';
import { CompanyAccountService } from '../_core/service/company-account.service';
import { TransactionService } from '../_core/service/transaction.service';
import { TranHistoryModalComponent } from './tran-history-modal/tran-history-modal.component';

@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.component.html',
  styleUrls: ['./company-account.component.css']
})
export class CompanyAccountComponent implements OnInit {

  companyAccountModel: CompanyAccountModel = new CompanyAccountModel();
  transactionModel: TransactionModel = new TransactionModel();

  bsModalRef: BsModalRef;

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

  saveCompanyAcc() {


    let redOnj: any = {}

    if (!this.conpanyAccList || this.conpanyAccList.length == 0) {

      if (!this.companyAccountModel.type) {
        this._tosterService.warning('', 'Account Type Is Empty!.');
        return;
      }

      if (!this.companyAccountModel.accName) {
        this._tosterService.warning('', 'Account Name Is Empty!.');
        return;
      }

      if (!this.companyAccountModel.accNumber) {
        this._tosterService.warning('', 'Account Number Is Empty!.');
        return;
      }

      redOnj = {
        companyAccount: this.companyAccountModel,
        transaction: { "des": "Initial balance amount", "crAmount": this.companyAccountModel.balance, drAmount: 0 }
      }
    } else {
      this.saveTransaction();
      return;
    }

    redOnj.companyAccount.balance = 0;
    this._companyAccountService.createCompanyAccount(redOnj).subscribe(
      res => {
        if (res.success) {
          this._tosterService.success('', res.message);
          this.companyAccountModel = new CompanyAccountModel();
          this.transactionModel = new TransactionModel();
          this.companyAccList();
          if (this.conpanyAccList.length > 0) {
            this.getTranList({ comAccount: this.conpanyAccList[0] });
          }
        } else {
          this._tosterService.warning('', res.message);
        }
      }
    );
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

  //========================================================

  saveTransaction() {

    if (!this.companyAccountModel.balance) {
      this._tosterService.warning('', 'Balance Is Empty!.');
      return;
    }

    this.transactionModel.des = "Add amount";
    this.transactionModel.crAmount = this.companyAccountModel.balance;
    this.transactionModel.drAmount = 0;
    this.transactionModel.comAccount = this.conpanyAccList[0];

    this._transactionService.createTransaction(this.transactionModel).subscribe(
      res => {
        if (res.success) {
          this._tosterService.success('', res.message);
          this.companyAccountModel = new CompanyAccountModel();
          this.transactionModel = new TransactionModel();
          this.companyAccList();
          if (this.conpanyAccList.length > 0) {
            this.getTranList({ comAccount: this.conpanyAccList[0] });
          }
        } else {
          this._tosterService.warning('', res.message);
        }
      }
    );
  }

  tranHistory() {
    const initialState = {
      transactionList: this.transactionList
    }
    this.bsModalRef = this._modalService.show(TranHistoryModalComponent, { class: 'modal-md', initialState, backdrop: 'static' });
    this.bsModalRef.content.onClose.subscribe(result => {
    });
  }

  getTranList(data: any) {
    this._transactionService.findByCompany(data).subscribe(
      res => {
        this.transactionList = res.items ? res.items : [];
      }
    );
  }

  currentBalance() {
    if (this.transactionList && this.transactionList.length > 0) {
      return this.transactionList.map(data1 => data1.crAmount).reduce((data2, data3) => { return data2 + data3 }, 0) - this.transactionList.map(data1 => data1.drAmount).reduce((data2, data3) => { return data2 + data3 }, 0);
    }
  }

}


