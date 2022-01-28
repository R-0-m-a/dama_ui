import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {PriceConfig} from "../../model/price-config.model";
import {PriceConfigService} from "../../service/price-config.service";
import {NotificationService} from "../../notification.service";
import {NotificationType} from "../../notification-type";

declare var $: any;

@Component({
  selector: 'app-price-config',
  templateUrl: './price-config.component.html',
  styleUrls: ['./price-config.component.css']
})
export class PriceConfigComponent implements OnInit {
  isSaving = false;
  priceConfig!: PriceConfig;

  priceConfigForm = this.formBuilder.group({
    id: [],
    premiumRate: ['', [Validators.pattern("[0-9]+")]],
    deliveryPrice: ['', [Validators.pattern('^[0-9]+(\\.[0-9]+)?')]]
  })


  constructor(private priceConfigService: PriceConfigService, private route: ActivatedRoute, private formBuilder: FormBuilder, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.priceConfigService.getPriceConfig().subscribe(priceConfig => {
        this.isSaving = false;
        this.priceConfig = priceConfig;
        this.updateForm(priceConfig);
      },
      () => (this.isSaving = false)
    );
  }

  save(): void {
    this.isSaving = true;
    this.updatePriceConfig(this.priceConfig);
    if (this.priceConfig.id !== undefined) {
      this.priceConfigService.update(this.priceConfig).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(priceConfig: PriceConfig): void {
    this.priceConfigForm.patchValue({
      id: priceConfig.id,
      premiumRate: priceConfig.premiumRate,
      deliveryPrice: priceConfig.deliveryPrice
    });
  }

  private updatePriceConfig(priceConfig: PriceConfig): void {
    if (this.priceConfigForm.get(['id'])!.value) {
      priceConfig.id = this.priceConfigForm.get(['id'])!.value;
    }
    priceConfig.premiumRate = this.priceConfigForm.get(['premiumRate'])!.value;
    priceConfig.deliveryPrice = this.priceConfigForm.get(['deliveryPrice'])!.value;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.notificationService.showNotification('top','center', "New config successfully saved", NotificationType.SUCCESS);
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }

}
