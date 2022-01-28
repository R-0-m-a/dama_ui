import {Injectable} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ImgDialogComponent} from "../components/dialog/img-dialog/img-dialog.component";
import {
  EarringTemporaryPartListDialogComponent
} from "../components/dialog/earring-temporary-part-list-dialog/earring-temporary-part-list-dialog.component";
import {EarringService} from "./earring.service";
import {EarringPartService} from "./earring-part.service";

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private modalService: NgbModal, private earringService: EarringService, private earringPartService: EarringPartService) {
  }

  zoomImg(imgUrl: any) {
    const modalRef = this.modalService.open(ImgDialogComponent);
    modalRef.componentInstance.imgUrl = imgUrl;
  }

  showTempParts() {
    if (this.getCountTempEarringPart() > 0){
      this.modalService.open(EarringTemporaryPartListDialogComponent, {size: 'lg', backdrop: 'static'});
    }
  }

  getCountTempEarringPart(){
    var tempEarringParts = this.earringService.getTempEarringParts();
    if (tempEarringParts != null){
      return tempEarringParts.length
    }
    return 0;
  }

}
