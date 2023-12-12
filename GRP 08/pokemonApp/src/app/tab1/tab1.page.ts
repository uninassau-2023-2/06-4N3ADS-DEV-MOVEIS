import { Component } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';
import { ViaCEPService } from './../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  areaBuscarPokemon: string = '54450160';
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };

  pokemon: any = {
    id: '',
    name: '',
    power: '',
    abilities: '',
    height: '',
    weight: ''
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService
  ) {}

  buscarPokemon(){
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
    .subscribe((value) =>{
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro =', ' + JSON.parse(JSON.stringify(value))["bairro"];
      this.areaBusca.localidade = '- ' +  JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf ='- ' +  JSON.parse(JSON.stringify(value))['uf'];
    
      this.pokeAPIService.getPokeAPIService().subscribe((value)=> {
        this.pokemon.id = JSON.parse(JSON.stringify(value))['id'];
        this.pokemon.name = JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.power = JSON.parse(JSON.stringify(value))['power'];
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
      });

    });

  
    
 }

}