import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { GradeModel } from '../_core/model/grade.model';
import { GradeService } from '../_core/service/grade.service';
import { UpdateGradeComponent } from './update-grade/update-grade.component';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  gradeList: any[] = [];
  gradeModel: GradeModel = new GradeModel();

  bsModalRef: BsModalRef;

  constructor(
    private _modalService: BsModalService,
    private _gradeService: GradeService,
    private _tosterService: ToastrService
  ) { }

  ngOnInit() {
    this.getGradeList();
  }


  getGradeList() {
    this._gradeService.findGradeList({}).subscribe(
      res => {
        this.gradeList = res.items ? res.items : [];
        console.log(res);
      }
    )
  }

  updateGrade(getVal) {

    const initialState = {
      gradeModel: { ...getVal }
    }
    this.bsModalRef = this._modalService.show(UpdateGradeComponent, { class: 'modal-md', initialState, backdrop: 'static' });
    this.bsModalRef.content.onClose.subscribe(result => {
      if (result == true) {
        this.getGradeList();
      }
    });
  }

  saveGrade() {

    if (!this.gradeModel.basic) {
      this._tosterService.warning('', 'Basic Salary is empty!');
      return;
    }

    this._gradeService.createGrade(this.gradeModel).subscribe(
      res => {
        if (res.success) {
          this._tosterService.success('', res.message);         
          this.gradeModel = new GradeModel();
          this.getGradeList();
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
