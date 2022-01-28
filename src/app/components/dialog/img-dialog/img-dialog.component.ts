import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.css']
})
export class ImgDialogComponent implements OnInit {

  imgUrl!:string;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
