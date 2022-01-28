export class FileUpload {
  key!: string | null;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
