import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  areaBuscarPokemon: string = '52011210';
  pok1:number;
  public resultado: string;
  

  pokemon: any = {
    abilities: '',
    front_default: '',
    height: '',
    name: '',
    weight: ''
};

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private box: BoxService,
    
    ) {
      this.pok1 = 0,
      this.resultado = ''
    }

  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }

  ionViewDidEnter() {
    this.buscarPokemon();

  }

  compararPokemon(pok2: number) {
    if (this.pok1 > pok2) {
      this.resultado = 'PERDEU';
    }if (this.pok1 == pok2) {
      this.resultado = 'EMPATE';
    } else if (this.pok1 < pok2) {
      this.resultado = 'GANHOU';
    }
    console.log(this.pok1,pok2)
  }
  

  buscarPokemon() {
    
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.name =  JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pok1 = this.box.getDado();
        this.compararPokemon(this.pokemon.abilities);
      });
      
  }


}
