import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { SharePokemonService } from '../services/share-pokemon.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page{

  pokemonItens: any = {
    id: 0,
    name: '',
    abilities: 0,
    weight: '',
    height: '',
    img: ''
  };

  resultadoBatalha: string = '';

  empate: boolean = false;
  ganhou: boolean = false;
  perdeu: boolean = false;

  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private sharePokemonService: SharePokemonService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  get photoPaths(): string[] {
    return this.photoService.getPhotoPaths() || [];
  }

  ionViewDidEnter() {
    this.buscarNovoPokemon();
  }

  private buscarNovoPokemon() {
    this.pokemonItens.id = Math.floor(Math.random() * 100);

    this.sharePokemonService.getAbilities().subscribe((numeroHabilidadesTab1) => {
      this.pokeAPIService.getPokeAPIService(this.pokemonItens.id).subscribe((value) => {
        this.pokemonItens.id = JSON.parse(JSON.stringify(value))['id'];
        this.pokemonItens.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemonItens.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemonItens.weight = JSON.parse(JSON.stringify(value))['weight'];
        this.pokemonItens.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemonItens.img = JSON.parse(JSON.stringify(value))['sprites']['front_default'];

      });
      this.batalhar(numeroHabilidadesTab1);
    });
  }

  private batalhar(numeroHabilidadesTab1: number) {
    const numeroHabilidadesTab2 = this.pokemonItens.abilities;
  
    this.empate = false;
    this.ganhou = false;
    this.perdeu = false;
  
    const lastPokemon = this.sharePokemonService.getPokemonList()[this.sharePokemonService.getPokemonList().length - 1];
  
    if (numeroHabilidadesTab1 === numeroHabilidadesTab2) {
      this.empate = true;
      this.resultadoBatalha = 'EMPATE';
      lastPokemon.empate++;
    } else if (numeroHabilidadesTab1 < numeroHabilidadesTab2) {
      this.perdeu = true;
      this.resultadoBatalha = 'PERDEU';
      lastPokemon.derrota++;
    } else {
      this.ganhou = true;
      this.resultadoBatalha = 'GANHOU';
      lastPokemon.vitoria++;
    }
  }
  

}
