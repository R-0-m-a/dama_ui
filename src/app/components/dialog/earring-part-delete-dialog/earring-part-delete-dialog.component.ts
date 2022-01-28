import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EarringPart} from "../../../model/earring-part.model";
import {EarringPartService} from "../../../service/earring-part.service";
import {NotificationService} from "../../../notification.service";
import {NotificationType} from "../../../notification-type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-earring-part-delete-dialog',
    templateUrl: './earring-part-delete-dialog.component.html',
    styleUrls: ['./earring-part-delete-dialog.component.css']
})
export class EarringPartDeleteDialogComponent implements OnInit {
    earringPart?: EarringPart;

    constructor(private activeModal: NgbActiveModal, private earringPartService: EarringPartService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    delete(id: string) {
        this.earringPartService.deleteEarringPart(id).subscribe(() => {
              this.closeModal('deleted');
            }, response => {
                this.closeModal('has error');
                this.processError(response);
            }
        )
    }

    cancel() {
        this.activeModal.dismiss();
    }

    private closeModal(result: String){
      this.activeModal.close(result);
    }

    private processError(response: HttpErrorResponse): void {
        this.notificationService.showNotification('top', 'center', response.error.title, NotificationType.DANGER);
    }

}
