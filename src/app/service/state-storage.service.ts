import {Injectable} from '@angular/core';
import {SessionStorageService} from "ngx-webstorage";
import {EarringPart} from "../model/earring-part.model";

@Injectable({
  providedIn: 'root'
})
export class StateStorageService {

  private previousUrlKey = 'previousUrl';
  private tempEarringPartsKey = 'tempEarringParts';

  constructor(private sessionStorageService: SessionStorageService) {}

  storeUrl(url: string): void {
    this.sessionStorageService.store(this.previousUrlKey, url);
  }

  getUrl(): string | null {
    return this.sessionStorageService.retrieve(this.previousUrlKey) as string | null;
  }

  clearUrl(): void {
    this.sessionStorageService.clear(this.previousUrlKey);
  }

  storeTempEarringParts(tempEarringParts: EarringPart[]): void {
    this.sessionStorageService.store(this.tempEarringPartsKey, tempEarringParts);
  }

  getTempEarringParts(): EarringPart[] | null {
    return this.sessionStorageService.retrieve(this.tempEarringPartsKey) as EarringPart[] | null;
  }

  clearTempEarringParts(): void {
    this.sessionStorageService.clear(this.tempEarringPartsKey);
  }

}
