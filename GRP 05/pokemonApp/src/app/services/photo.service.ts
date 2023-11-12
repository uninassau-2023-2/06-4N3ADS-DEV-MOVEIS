// photo.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: string[] = [];

  constructor() { }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    if (capturedPhoto && capturedPhoto.webPath) {
      this.photos.push(capturedPhoto.webPath);
    }
  }

  getPhotoPaths(): string[] {
    return this.photos;
  }
}
