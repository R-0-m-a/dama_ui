import {Component, OnInit} from '@angular/core';
import {EarringPart} from "../../../../model/earring-part.model";
import {EarringPartService} from "../../../../service/earring-part.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UtilitiesService} from "../../../../service/utilities.service";
import {CrystalDialogComponent} from "../../../dialog/crystal-dialog/crystal-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationType} from "../../../../notification-type";
import {NotificationService} from "../../../../notification.service";
import {CrystalService} from "../../../../service/crystal.service";

@Component({
  selector: 'app-earring-part-create',
  templateUrl: './earring-part-create.component.html',
  styleUrls: ['./earring-part-create.component.css']
})
export class EarringPartCreateComponent implements OnInit {
  earringPart!: EarringPart;
  oldEarringPart!: EarringPart;
  isSaving = false;
  isLoadingCrystal: boolean = false;

  editForm = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    description: [],
    identifier: [],
    material: [],
    imageUrl: [],
    color: [],
    price: ['', [Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]+)?')]],
    selectFile: []

  })

  constructor(private earringPartService: EarringPartService, private utilitiesService: UtilitiesService,
              private route: ActivatedRoute, private formBuilder: FormBuilder, private modalService: NgbModal,
              private notificationService: NotificationService, private crystalService: CrystalService) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(({id}) => {
      if (id){
        this.earringPartService.getEarringPart(id)
          .subscribe(
            earringPart => {
              this.isSaving = false;
              this.earringPart = earringPart;
              this.updateForm(earringPart);
            },
            () => (this.isSaving = false)
          );
      }
      else this.earringPart = new EarringPart();
    })
  }

  save(): void {
    this.isSaving = true;
    this.updateEarringPart(this.earringPart);
    if (this.earringPart.id !== undefined) {
      this.earringPartService.update(this.earringPart, this.oldEarringPart).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.earringPartService.save(this.earringPart).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(part: EarringPart): void {
    this.oldEarringPart = {...part};
    this.editForm.patchValue({
      id: part.id,
      name: part.name,
      description: part.description,
      identifier: part.identifier,
      color: part.color,
      imageUrl: part.imageUrl,
      material: part.material,
      price: part.price
    });
  }

  private updateEarringPart(part: EarringPart): void {
    if (this.editForm.get(['id'])!.value){
      part.id = this.editForm.get(['id'])!.value;
    }
    part.name = this.editForm.get(['name'])!.value;
    part.description = this.editForm.get(['description'])!.value;
    part.identifier = this.editForm.get(['identifier'])!.value;
    part.color = this.editForm.get(['color'])!.value;
    part.imageUrl = this.editForm.get(['imageUrl'])!.value;
    part.material = this.editForm.get(['material'])!.value;
    part.price = this.editForm.get(['price'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }

  getImageUrl(url : string){
    this.earringPart.imageUrl = url;
    this.editForm.patchValue({
      imageUrl: url
    });
  }

  searchCrystal() {
    this.isLoadingCrystal = true;
    this.crystalService.searchCrystal(this.editForm.get(['identifier'])!.value).subscribe(crystal => {
      this.isLoadingCrystal = false;
      const modalRef = this.modalService.open(CrystalDialogComponent);
      modalRef.componentInstance.crystal = crystal;
    }, response => this.processError(response));
  }

  private processError(response: HttpErrorResponse): void {
    this.isLoadingCrystal = false;
    this.notificationService.showNotification('top','center', response.error.title, NotificationType.WARNING);
  }
}
