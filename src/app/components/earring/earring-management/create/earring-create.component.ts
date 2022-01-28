import {Component, OnInit} from '@angular/core';
import {Earring} from "../../../../model/earring.model";
import {EarringService} from "../../../../service/earring.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {EarringPart} from "../../../../model/earring-part.model";
import {
    EarringPartListDialogComponent
} from "../../../dialog/earring-part-list-dialog/earring-part-list-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-earring-create',
  templateUrl: './earring-create.component.html',
  styleUrls: ['./earring-create.component.css']
})
export class EarringCreateComponent implements OnInit {
  earring!: Earring;
  oldEarring!: Earring;
  isSaving = false;

  editForm = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    description: [],
    imageUrl: [],
    earringDetails: [],
    selectFile: []
  })
  earringParts!: EarringPart[];

  constructor(private earringService: EarringService, private route: ActivatedRoute, private formBuilder: FormBuilder, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      if (id) {
        this.earringService.getEarring(id)
          .subscribe(
            earring => {
              this.isSaving = false;
              this.earring = earring;
              this.updateForm(earring);
              this.earring.earringDetails?.forEach(value => this.earringService.addToCart(value))
            },
            () => (this.isSaving = false)
          );
      } else this.earring = new Earring();
    });
    this.updateEarringParts();
  }

  private updateForm(earring: Earring): void {
    this.oldEarring = {...earring};
    this.editForm.patchValue({
      id: earring.id,
      name: earring.name,
      description: earring.description,
      imageUrl: earring.imageUrl,
      earringDetails: earring.earringDetails
    });
  }

  private updateEarring(earring: Earring): void {
    if (this.editForm.get(['id'])!.value) {
      earring.id = this.editForm.get(['id'])!.value;
    }
    earring.name = this.editForm.get(['name'])!.value;
    earring.description = this.editForm.get(['description'])!.value;
    earring.imageUrl = this.editForm.get(['imageUrl'])!.value;
    earring.earringDetails = this.getTempEarringPart();
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.earringService.clearCart();
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }

  getImageUrl(url: string) {
    this.earring.imageUrl = url;
    this.editForm.patchValue({
      imageUrl: url
    });
  }

  save(): void {
    this.isSaving = true;
    this.updateEarring(this.earring);
    if (this.earring.id !== undefined) {
      this.earringService.update(this.earring, this.oldEarring).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.earringService.save(this.earring).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  updateEarringParts() {
    let earringParts = this.earringService.getTempEarringParts();
    this.earringParts = earringParts;
    this.earring.earringDetails = earringParts;
    this.editForm.patchValue({
      earringDetails: earringParts
    });
  }

  addTempEarringPart() {
    const modalRef = this.modalService.open(EarringPartListDialogComponent, {size: 'lg', backdrop: 'static'});
    modalRef.closed.subscribe(reason => {
      if (reason === 'finished') {
        this.updateEarringParts();
      }
    })
  }

  getTempEarringPart(){
    var tempEarringParts = this.earringService.getTempEarringParts();
    if (tempEarringParts != null) {
      return tempEarringParts;
    }
    return [];
  }

  cancel() {
    if (this.earring.id) {
      this.earringService.clearCart();
    }
    this.previousState();
  }

}
