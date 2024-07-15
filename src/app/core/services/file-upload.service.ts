import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor() { }

  public uploadFileToText(file: File): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsText(file);
    });
  }


}
