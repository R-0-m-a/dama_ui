import {EventEmitter, Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {FileUpload} from "../model/file-upload.model";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads/images';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload, fileUploadUrl?: EventEmitter<string>): Observable<number | undefined>{

    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          if (fileUploadUrl){
            fileUploadUrl.emit(downloadURL);
          }
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    if (fileUpload && fileUpload.key && fileUpload.name){
      this.deleteFileDatabase(fileUpload.key)
        .then(() => {
          this.deleteFileStorage(fileUpload.name);
        })
        .catch(error => console.log(error));
    }

  }

  deleteFileByImgUrl(imgUrl: string){
    let ref = this.db.database.ref(this.basePath).orderByChild("url").equalTo(imgUrl);

    ref.on("child_added", snap =>{
      let data: FileUpload = snap.val();
      data.key = snap.key;
      this.deleteFile(data);
    });
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

}
