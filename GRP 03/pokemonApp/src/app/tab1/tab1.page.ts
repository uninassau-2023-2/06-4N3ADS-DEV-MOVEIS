import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharedService } from '../services/shared.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
    abilities: '',
    height: '',
    weight: ''
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharedService: SharedService,
  ) { }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ' - ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = ' ' + JSON.parse(JSON.stringify(value))['uf'];
    });

    this.pokeAPIService.getRandomPokemonData().subscribe((pokemonData: any) => {
      this.areaBusca.abilities = pokemonData.abilities.length;
      this.sharedService.numberOfAbilitiesTab1 = this.areaBusca.abilities;
      this.areaBusca.height = pokemonData.height;
      this.areaBusca.weight = pokemonData.weight;
      this.areaBusca.name = pokemonData.name;
      this.areaBusca.id = pokemonData.id;
      this.areaBusca.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.areaBusca.id}.svg`;
    });
  }
}
