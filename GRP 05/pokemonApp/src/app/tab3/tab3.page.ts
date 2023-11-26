import { Component, OnInit } from '@angular/core';
import { SharePokemonService } from '../services/share-pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  pokemonList!: any;

  constructor(private sharePokemonService: SharePokemonService) { }
  
  ngOnInit(): void {
    this.pokemonList = this.sharePokemonService.getPokemonList();
  }

  
}