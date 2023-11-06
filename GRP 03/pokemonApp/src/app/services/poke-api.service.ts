import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class PokeAPIService {
  constructor(private httpClient: HttpClient) { }

  getRandomPokemonId() {
    return Math.floor(Math.random() * 100) + 1;
  }

  getRandomPokemonData() {
    const randomPokemonId = this.getRandomPokemonId();
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
  }
}
