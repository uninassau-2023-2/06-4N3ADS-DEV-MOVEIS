// shared.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  getComparisonColor(result: string): string {
    throw new Error('Method not implemented.');
  }
  numberOfAbilitiesTab1: number = 0;
  private statsUpdatedSource = new BehaviorSubject<void | null>(null);
  private capturedPokemonData: any[] = [];
  statsUpdated$ = this.statsUpdatedSource.asObservable();

  private capturedPokemons: any[] = [];

  notifyStatsUpdated() {
    this.statsUpdatedSource.next(null);
  }

  addCapturedPokemon(pokemon: any) {
    const capturedPokemonIndex = this.capturedPokemons.findIndex(p => p.data.id === pokemon.id);


    if (capturedPokemonIndex !== -1) {
      // Pokémon já existe na lista, então atualize as estatísticas
      const capturedPokemon = this.capturedPokemons[capturedPokemonIndex];
      if (pokemon.comparisonResult === 'Ganhou') {
        capturedPokemon.victories++;
      } else if (pokemon.comparisonResult === 'Perdeu') {
        capturedPokemon.defeats++;
      } else {
        capturedPokemon.ties++;
      }
    } else {
      // Pokémon é novo, adicione à lista
      const newCapturedPokemon = {
        data: pokemon,
        victories: pokemon.comparisonResult === 'Ganhou' ? 1 : 0,
        defeats: pokemon.comparisonResult === 'Perdeu' ? 1 : 0,
        ties: pokemon.comparisonResult === 'Empate' ? 1 : 0,
      };

      this.capturedPokemons.push(newCapturedPokemon);
      this.capturedPokemonData.push(pokemon);
    }
  }

  clearCapturedPokemons() {
    this.capturedPokemons = [];
  }


  getLastCapturedPokemon() {
    const lastCapturedPokemon = this.capturedPokemons.pop();

    if (lastCapturedPokemon) {
      // Retorna uma cópia do último Pokémon capturado
      return { ...lastCapturedPokemon };
    }

    return null;
  }

  getCapturedPokemons() {
    return [...this.capturedPokemonData];
  }
}
