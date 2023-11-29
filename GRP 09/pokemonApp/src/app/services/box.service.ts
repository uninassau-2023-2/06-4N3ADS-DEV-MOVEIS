import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private dado: any = 0;
  private pokemons: any[] = []
  constructor() {}

  setDado(dado:any){
    this.dado = dado;
  }
  getDado(){
    return this.dado;
  }

  addPokemon(poke: any){
    this.pokemons.push(poke);
  }

  seePokemon(){
    return this.pokemons;
  }

}
