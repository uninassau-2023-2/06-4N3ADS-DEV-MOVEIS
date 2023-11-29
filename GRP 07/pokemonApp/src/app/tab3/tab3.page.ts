import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemon: any = {
    name: '',
    id: '',
    sprites: {
      front_default: '',
    },
  };

  

  constructor(
    private pokeAPIService: PokeAPIService
    ) {}

    ngOnInit() {
      this.getPokemon();
    }

  getPokemon() {
    
    this.pokeAPIService.getPokeAPIService(this.pokemon).subscribe((value) => {
      
      this.pokemon.sprites.front_default = JSON.parse(JSON.stringify(value))['sprites']['front_default'];
      
    });
  }
  getStatColor(statType: string): string {
    switch (statType) {
      case 'success':
        return 'green'; 
      case 'danger':
        return 'red'; 
      case 'warning':
        return 'yellow'; 
      default:
        return 'black'; 
    }
  }
}
