import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileUpload} from "../../../model/file-upload.model";
import {FileUploadService} from "../../../service/file-upload.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  currentFileUpload?: FileUpload;
  @Output() fileUploadUrl = new EventEmitter<string>();
  percentage = 0;

  uploadForm = this.formBuilder.group({
    selectFile: []
  })

  constructor(private uploadService: FileUploadService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  upload(): void {
    const selectedFile = this.uploadForm.get(['selectFile'])!.value;
    if (selectedFile) {
      const file: File | null = selectedFile;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.fileUploadUrl).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            this.fileUploadUrl.emit(this.currentFileUpload?.url);
          },
          error => {
            console.log(error);
          }
        );
      }
    }

  }

}
