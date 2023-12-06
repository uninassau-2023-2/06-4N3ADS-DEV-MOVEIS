import { Component } from '@angular/core';
import { BoxService } from '../services/box.service';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  pokemon: any = {
    abilities: '',
    front_default: '',
    height: '',
    name: '',
    weight: ''
  };

  listadePokemons: any[];


  

  constructor(
    private box: BoxService,
    private pokeAPIService: PokeAPIService
  ) {
    this.listadePokemons = this.box.seePokemon();
  }


  OnInit(){
    this.buscarPokemon()
  }
    
  buscarPokemon() {
    
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemon.abilities = JSON.parse(JSON.stringify(value))['abilities'].length;
        this.pokemon.front_default = JSON.parse(JSON.stringify(value))['sprites']['front_default'];
        this.pokemon.height = JSON.parse(JSON.stringify(value))['height'];
        this.pokemon.name =  JSON.parse(JSON.stringify(value))['name'];
        this.pokemon.weight = JSON.parse(JSON.stringify(value))['weight'];
      });
      
  }

}
