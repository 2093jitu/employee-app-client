import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CompanyAccountModel } from '../../_core/model/company-account.model';
import { TransactionModel } from '../../_core/model/transaction.model';
import { TransactionService } from '../../_core/service/transaction.service';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
  styleUrls: ['./transfer-modal.component.css']
})
export class TransferModalComponent implements OnInit {

  onClose: Subject<boolean>;
  title: string;
  data: any = {}
  companyAcc: any = {}
  transactionModel: TransactionModel = new TransactionModel();
  transferAmm: number;
  oldTransferAmm: number;
  currentComBalance: number;

  constructor(
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _transactionService: TransactionService,
    private _tosterService: ToastrService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
    this.oldTransferAmm = JSON.parse(JSON.stringify(this.transferAmm));
    console.log(this.data);
  }

  saveTransaction() {
    if (!this.transferAmm) {
      this._tosterService.warning('', 'Transfer Ammount is empty!.');
      return;
    }

    this.transactionModel.des = `Transfer to ${this.data.accNumber}`;
    this.transactionModel.crAmount = 0
    this.transactionModel.drAmount = this.transferAmm;
    this.transactionModel.empAccount = this.data;
    this.transactionModel.comAccount = this.companyAcc;

    if (this.currentComBalance < this.transferAmm) {
      this._tosterService.warning('', 'Please Add Balance!.');
      this.goToAddAmmountList();
      return;
    }


    this._transactionService.createTransaction(this.transactionModel).subscribe(
      res => {
        if (res.success) {
          this._tosterService.success('', res.message);
          this.onClose.next(true);
          this.bsModalRef.hide();
        } else {
          this._tosterService.warning('', res.message);
        }
      },

      err => {
        console.log("save error; ", err);
        this._tosterService.warning('', "Error occured");
      });
  }

  goToAddAmmountList() {
    this.bsModalRef.hide();
    this._router.navigateByUrl('company-account');
  }

  validationTranAmt() {
    console.log(this.oldTransferAmm, ' new ', this.transferAmm);
    if (this.oldTransferAmm < this.transferAmm) {
      this._tosterService.warning('', 'Given Ammount is getter then transfer ammount !');
      this.transferAmm = this.oldTransferAmm;
      return;
    }
  }

}
