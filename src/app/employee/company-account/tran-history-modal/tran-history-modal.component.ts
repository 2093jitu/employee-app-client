import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tran-history-modal',
  templateUrl: './tran-history-modal.component.html',
  styleUrls: ['./tran-history-modal.component.css']
})
export class TranHistoryModalComponent implements OnInit {

  onClose: Subject<boolean>;
  title: string;
  transactionList: any[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _tosterService: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
    console.log(this.transactionList);
  }

}
