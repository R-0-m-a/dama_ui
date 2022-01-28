import {Component, OnInit} from '@angular/core';
import {FileUploadService} from "../../../service/file-upload.service";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[];

  constructor(private uploadService: FileUploadService) {
    this.uploadService.getFiles(20).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

  ngOnInit(): void {
  }

}
