import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { BoxService } from '../services/box.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = '54160449';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  pokemon: any = {
    abilities: '',
    front_default: '',
    height: '',
    name: '',
    weight: ''
};

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private box: BoxService
  ) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];
        
      });
    
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.name =  JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];

        this.box.setDado(this.pokemon.abilities);
        console.log(this.box.getDado());
      });

  }

}
