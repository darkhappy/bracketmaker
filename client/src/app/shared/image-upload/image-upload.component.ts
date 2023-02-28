import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent {
  @Output() fileUploaded = new EventEmitter<{ file: File }>();

  constructor() { }

  ngOnInit(): void {

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file || file.length === 0) {
      //TODO: replace with alert component !
      alert('No file selected');
      return;
    }
    if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      //TODO: replace with alert component !
      alert('File format is not supported');
      return;
    }
    if(file.size > 2000000) {
      //TODO: replace with alert component !
      alert('File size is too big');
      return;
    }
    this.fileUploaded.emit({ file });
  }
}
