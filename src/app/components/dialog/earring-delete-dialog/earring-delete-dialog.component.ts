import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Earring} from "../../../model/earring.model";
import {EarringService} from "../../../service/earring.service";

@Component({
  selector: 'app-earring-delete-dialog',
  templateUrl: './earring-delete-dialog.component.html',
  styleUrls: ['./earring-delete-dialog.component.css']
})
export class EarringDeleteDialogComponent implements OnInit {
  earring?: Earring;

  constructor(private activeModal: NgbActiveModal, private earringService: EarringService) {
  }

  ngOnInit(): void {
  }

  delete(id: string) {
    this.earringService.deleteEarring(id).subscribe(() => {
      this.activeModal.close('deleted');
    })
  }
  cancel(){
    this.activeModal.dismiss();
  }



}
