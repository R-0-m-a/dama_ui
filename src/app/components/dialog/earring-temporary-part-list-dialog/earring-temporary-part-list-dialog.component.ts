import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EarringService} from "../../../service/earring.service";

@Component({
  selector: 'app-earring-temporary-part-list-dialog',
  templateUrl: './earring-temporary-part-list-dialog.component.html',
  styleUrls: ['./earring-temporary-part-list-dialog.component.css']
})
export class EarringTemporaryPartListDialogComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, private earringService: EarringService) {
  }

  ngOnInit(): void {
  }

  cancel() {
    this.activeModal.dismiss();
  }

  // validationDialog(earringPars: EarringPart[]) {
  //   if (earringPars.length == 0) {
  //     this.cancel();
  //   }
  //
  // }

  getTempEarringPart() {
    return this.earringService.getTempEarringParts();
  }
}
