import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {EarringPart} from "../model/earring-part.model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {FileUploadService} from "./file-upload.service";
import {Earring} from "../model/earring.model";
import {StateStorageService} from "./state-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EarringService {
  private serverApiUrl = environment.SERVER_API_URL;
  private tempEarringParts: EarringPart[] = [];

  constructor(private http: HttpClient, private applicationConfigService: AppConfigService, private fileUploadService: FileUploadService, private stateStorageService:StateStorageService) {
  }

  getEarrings(): Observable<Earring[]> {
    return this.http.get<Earring[]>(`${this.serverApiUrl}/earrings`);
  }

  getEarring(id: string): Observable<Earring> {
    return this.http.get<Earring>(`${this.serverApiUrl}/earrings/${id}`);
  }

  save(earring: Earring): Observable<Earring> {
    return this.http.post<Earring>(`${this.serverApiUrl}/earrings`, earring);
  }

  update(earring: Earring, oldEarring?: Earring): Observable<Earring> {

    if (oldEarring && oldEarring.imageUrl && oldEarring.imageUrl != earring.imageUrl) {
      this.fileUploadService.deleteFileByImgUrl(oldEarring.imageUrl);
    }
    return this.http.put<Earring>(`${this.serverApiUrl}/earrings`, earring);
  }

  addToCart(earringPart: EarringPart) {
    this.tempEarringParts.push({...earringPart});
    this.stateStorageService.storeTempEarringParts(this.tempEarringParts);
  }

  getTempEarringParts() {
    var tempEarringParts = this.stateStorageService.getTempEarringParts();
    if (tempEarringParts != null){
      return tempEarringParts;
    }
    return [];
  }

  deleteEarringPartFromCart(earringPart: EarringPart){
    this.tempEarringParts = this.tempEarringParts.filter(value => value !== earringPart);
    this.stateStorageService.storeTempEarringParts(this.tempEarringParts);
  }

  clearCart() {
    this.tempEarringParts = [];
    this.stateStorageService.clearTempEarringParts();
  }

  deleteEarring(id: string): Observable<{}> {
    //this.deleteImgForEarring(id);
    return this.http.delete(`${this.serverApiUrl}/earrings/${id}`);
  }

  deleteImgForEarring(id: string) {
    this.getEarring(id).subscribe(earring => {
      if (earring && earring.imageUrl) {
        this.fileUploadService.deleteFileByImgUrl(earring.imageUrl);
      }
    })
  }

}
