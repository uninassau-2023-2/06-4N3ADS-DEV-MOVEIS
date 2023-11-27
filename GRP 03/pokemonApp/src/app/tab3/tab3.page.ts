// tab3.page.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, OnDestroy {
  private statsSubscription!: Subscription;
  capturedPokemons: any[] = [];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.statsSubscription = this.sharedService.statsUpdated$.subscribe(() => {
      this.capturePokemon();
    });

    this.capturePokemon();
  }

  ngOnDestroy() {
    this.statsSubscription.unsubscribe();
  }

  capturePokemon() {
    const capturedPokemon = this.sharedService.getLastCapturedPokemon();

    if (capturedPokemon) {
      // Verifica se o Pokémon já está na lista
      const existingPokemonIndex = this.capturedPokemons.findIndex(p => p.id === capturedPokemon.id);

      if (existingPokemonIndex !== -1) {
        // Pokémon já existe na lista, então atualiza as estatísticas
        const existingPokemon = this.capturedPokemons[existingPokemonIndex];
        existingPokemon.victories += capturedPokemon.victories;
        existingPokemon.defeats += capturedPokemon.defeats;
        existingPokemon.ties += capturedPokemon.ties;
      } else {
        // Pokémon é novo, adiciona à lista
        this.capturedPokemons.push({ ...capturedPokemon });
      }
    }
  }

  releasePokemon(index: number) {
    this.capturedPokemons.splice(index, 1);
    this.sharedService.notifyStatsUpdated();
  }

  getComparisonColor(result: string): string {
    switch (result) {
      case 'Empate':
        return 'yellow';
      case 'Ganhou':
        return 'red';
      case 'Perdeu':
        return 'green';
      default:
        return 'black'; // Cor padrão
    }
  }

  addPokemonCard(pokemon: any) {
    const newCapturedPokemon = {
      data: pokemon,
      victories: pokemon.comparisonResult === 'Ganhou' ? 1 : 0,
      defeats: pokemon.comparisonResult === 'Perdeu' ? 1 : 0,
      ties: pokemon.comparisonResult === 'Empate' ? 1 : 0,
      imageUrl: pokemon.imageUrl,
    }
    this.capturedPokemons.push(newCapturedPokemon);
  }
}

