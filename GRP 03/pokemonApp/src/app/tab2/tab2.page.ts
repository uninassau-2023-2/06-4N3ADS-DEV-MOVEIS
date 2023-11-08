import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pokemon: any = {
    abilities: '',
    height: '',
    weight: '',
    comparisonResult: ''
  };

  constructor(
    private photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    private httpClient: HttpClient,
    private sharedService: SharedService
  ) { }


  // Esta função será executada quando a página for aberta
  async ionViewWillEnter() {
    this.generateRandomPokemon();
  }

  generateRandomPokemon() {
    // Gerar um Pokémon aleatório
    this.pokeAPIService.getRandomPokemonData().subscribe((pokemonData: any) => {
      this.pokemon.abilities = pokemonData.abilities.length;
      this.pokemon.height = pokemonData.height;
      this.pokemon.weight = pokemonData.weight;
      this.pokemon.name = pokemonData.name;
      this.pokemon.id = pokemonData.id;
      this.pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemon.id}.svg`;





      // Compare com o Pokémon da Tab1 e defina a cor e o texto apropriados
      const numberOfAbilitiesTab1 = this.sharedService.numberOfAbilitiesTab1; // Defina o valor correto

      if (this.pokemon.abilities === numberOfAbilitiesTab1) {
        this.pokemon.comparisonResult = 'Empate';
      } else if (this.pokemon.abilities > numberOfAbilitiesTab1) {
        this.pokemon.comparisonResult = 'Ganhou';
      } else {
        this.pokemon.comparisonResult = 'Perdeu';
      }
    });
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  getComparisonColor(result: string): string {
    switch (result) {
      case 'Empate':
        return 'yellow';
      case 'Ganhou':
        return 'red';
      case 'Perdeu':
        return 'green';
      default:
        return 'black'; // Cor padrão
    }
  }
}
