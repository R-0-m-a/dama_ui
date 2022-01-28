import {Component, OnInit} from '@angular/core';
import {Earring} from "../../../../model/earring.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EarringService} from "../../../../service/earring.service";
import {EarringDeleteDialogComponent} from "../../../dialog/earring-delete-dialog/earring-delete-dialog.component";
import {UtilitiesService} from "../../../../service/utilities.service";

@Component({
  selector: 'app-earring-list',
  templateUrl: './earring-list.component.html',
  styleUrls: ['./earring-list.component.css']
})
export class EarringListComponent implements OnInit {
  earrings: Earring[] | null = null;
  isCollapsed = false;
  isLoading = false;

  constructor(private earringService: EarringService, private modalService: NgbModal, public utilities:UtilitiesService) { }

  loadAll(): void {
    this.isLoading = true;
    this.earringService.getEarrings()
      .subscribe(
        earrings => {
          this.isLoading = false;
          this.earrings = earrings;
        },
        () => (this.isLoading = false)
      );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  delete(earring: Earring) {
    const modalRef = this.modalService.open(EarringDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.earring = earring;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    })
  }

}
