import {Component, OnInit} from '@angular/core';
import {EarringPart} from "../../../../model/earring-part.model";
import {EarringPartService} from "../../../../service/earring-part.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
    EarringPartDeleteDialogComponent
} from "../../../dialog/earring-part-delete-dialog/earring-part-delete-dialog.component";
import {EarringService} from "../../../../service/earring.service";
import {Earring} from "../../../../model/earring.model";
import {UtilitiesService} from "../../../../service/utilities.service";

@Component({
  selector: 'app-earring-details',
  templateUrl: './earring-part-list.component.html',
  styleUrls: ['./earring-part-list.component.css']
})

export class EarringPartListComponent implements OnInit {
  isCollapsed = false;
  isLoading = false;
  earringParts: EarringPart[] | null = null;


  constructor(private earringDetailsService: EarringPartService, private modalService: NgbModal, private earringService: EarringService, public utilities: UtilitiesService) {
  }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.isLoading = true;
    this.earringDetailsService.getEarringDetails()
      .subscribe(
        earringParts => {
          this.isLoading = false;
          this.earringParts = earringParts;
        },
        () => (this.isLoading = false)
      );
  }

  createEarring(): void {
    this.isLoading = true;
    var selectedParts = this.earringParts?.filter(x => x.checked);
    var newEarring = new Earring();
    newEarring.name = "NewEarring";
    newEarring.earringDetails = selectedParts;
    this.earringService.save(newEarring).subscribe(value => {
      this.isLoading = false;
    }, () => (this.isLoading = false));
    // this.earringDetailsService.getEarringDetails()
    //   .subscribe(
    //     earringParts => {
    //       this.isLoading = false;
    //       this.earringParts = earringParts;
    //     },
    //     () => (this.isLoading = false)
    //   );
  }

  hasCheckedElement(): boolean {
    return <boolean>this.earringParts?.some(value => value.checked);
  }

  hasTempEarringPart(): boolean {
    var tempEarringParts = this.earringService.getTempEarringParts();
    if (tempEarringParts!= null){
      return tempEarringParts.length > 0;
    }
    return false;
  }

  delete(earringPart: EarringPart) {
    const modalRef = this.modalService.open(EarringPartDeleteDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.earringPart = earringPart;
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    })
  }

  addTempEarringPart(earringPart: EarringPart) {
    this.earringService.addToCart(earringPart);
  }

}
