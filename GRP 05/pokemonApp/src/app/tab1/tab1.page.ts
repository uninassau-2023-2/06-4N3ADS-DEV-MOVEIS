import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';
import { SharePokemonService } from '../services/share-pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  areaBuscarPokemon: string = '52011210';

  areaBusca: any = {
    bairro: '',
    logradouro: '',
    localidade: '',
    uf: ''
  };

  pokemonItens: any = {
    id: 0,
    name: '',
    abilities: 0,
    weight: '',
    height: '',
    img: ''
  };

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private sharePokemonService: SharePokemonService
  ) { }

  ngOnInit(): void {
    this.buscarPokemon()
  }

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = JSON.parse(JSON.stringify(value))['uf'];
    });

    this.pokemonItens.id = Math.floor(Math.random() * 100);
    this.pokeAPIService.getPokeAPIService(this.pokemonItens.id).subscribe((value) => {
      this.pokemonItens.id = JSON.parse(JSON.stringify(value))['id'];
      this.pokemonItens.name = JSON.parse(JSON.stringify(value))['name'];
      this.pokemonItens.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
      this.pokemonItens.weight = JSON.parse(JSON.stringify(value))['weight'];
      this.pokemonItens.height = JSON.parse(JSON.stringify(value))['height'];
      this.pokemonItens.img = JSON.parse(JSON.stringify(value))['sprites']['front_default'];
      this.sharePokemonService.setAbilities(this.pokemonItens.abilities);
    });

  }


}
