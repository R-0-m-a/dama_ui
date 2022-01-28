import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Crystal} from "../../../model/crystal.model";

@Component({
  selector: 'app-crystal-dialog',
  templateUrl: './crystal-dialog.component.html',
  styleUrls: ['./crystal-dialog.component.css']
})
export class CrystalDialogComponent implements OnInit {

  crystal!: Crystal;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
