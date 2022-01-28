import {Component, OnInit} from '@angular/core';
import {EarringPart} from "../../../model/earring-part.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EarringPartService} from "../../../service/earring-part.service";
import {EarringService} from "../../../service/earring.service";

@Component({
  selector: 'app-earring-part-list-dialog',
  templateUrl: './earring-part-list-dialog.component.html',
  styleUrls: ['./earring-part-list-dialog.component.css']
})
export class EarringPartListDialogComponent implements OnInit {

  isCollapsed = false;
  isLoading = false;
  earringParts: EarringPart[] | null = null;

  constructor(private activeModal: NgbActiveModal, private earringPartService: EarringPartService, private earringService: EarringService) {
  }

  ngOnInit(): void {
    this.loadAll()
  }

  loadAll(): void {
    this.isLoading = true;
    this.earringPartService.getEarringDetails()
      .subscribe(
        earringParts => {
          this.isLoading = false;
          this.earringParts = earringParts;
        },
        () => (this.isLoading = false)
      );
  }

  delete(id: string) {
    // this.earringPartService.deleteEarringPart(id).subscribe(() => {
    //   this.activeModal.close('deleted');
    // })
  }

  cancel() {
    this.activeModal.close('finished');
  }

  addTempEarringPart(earringPart: EarringPart) {
    this.earringService.addToCart(earringPart);
  }

}
