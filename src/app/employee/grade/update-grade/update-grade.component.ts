import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { GradeModel } from '../../_core/model/grade.model';
import { GradeService } from '../../_core/service/grade.service';

@Component({
  selector: 'app-update-grade',
  templateUrl: './update-grade.component.html',
  styleUrls: ['./update-grade.component.css']
})
export class UpdateGradeComponent implements OnInit {

  gradeModel: GradeModel = new GradeModel();
  onClose: Subject<boolean>;
  title: string;

  constructor(
    public bsModalRef: BsModalRef,
    private _modalService: BsModalService,
    private _gradeService: GradeService,
    private _tosterService: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  updateGrade() {
    if (!this.gradeModel.basic) {
      this._tosterService.warning('', 'Basic Salary is empty!');
      return;
    }

    this._gradeService.updateGrade(this.gradeModel).subscribe(
      res => {
        if (res.success) {
          this._tosterService.success('', res.message);
          this.onClose.next(true);
          this.bsModalRef.hide();
          this.gradeModel = new GradeModel();
        } else {
          this._tosterService.warning('', res.message);
        }
      },

      err => {
        console.log("save error; ", err);
        this._tosterService.warning('', "Error occured");
      });
  }

 

}
