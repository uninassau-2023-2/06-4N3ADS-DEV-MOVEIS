import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  getPokemons(): any[] {
    throw new Error('Method not implemented.');
  }
  getPokemon(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }
  getPokeAPIService(id: number = Math.floor(Math.random() * 100)){
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
