import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  pikachuSkills: number = 3;
  result: string = ''; 

  constructor(
    private route: ActivatedRoute,
    public photoService: PhotoService
  ) {}

  
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      console.log('Raw Bulbasaur Skills:', params['bulbasaurSkills']);
      const bulbasaurSkills = Number(params['bulbasaurSkills']);
      this.compareSkills(bulbasaurSkills);
    });
  }
  
  compareSkills(bulbasaurSkills: number) {
    console.log('Pikachu Skills:', this.pikachuSkills);
    console.log('Bulbasaur Skills:', bulbasaurSkills);
  
    if (this.pikachuSkills === bulbasaurSkills) {
      this.result = 'Empate';
    } else if (this.pikachuSkills > bulbasaurSkills) {
      this.result = 'Ganhou';
    } else {
      this.result = 'Perdeu';
    }
  
    console.log('Result:', this.result);
  }
  
  
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
}
