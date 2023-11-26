import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharePokemonService {

  private pokemons: any[] = [];


  private pokeAbilitiesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  setAbilities(abilities: number) {
    this.pokeAbilitiesSubject.next(abilities);
  }

  getAbilities(): Observable<number> {
    return this.pokeAbilitiesSubject.asObservable();
  }

  getPokemonList(): any[] {
    return this.pokemons;
  }

  addPokemonList(pokemonNome: string, img: string, vitoria: number = 0, empate: number = 0, derrota: number = 0) {
    const newPokemon = { nome: pokemonNome, img, vitoria, empate, derrota };
    this.pokemons.push({ ...newPokemon }); 
  }
  
}
