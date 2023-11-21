import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharePokemonService {
  private pokeAbilitiesSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  setAbilities(abilities: number) {
    this.pokeAbilitiesSubject.next(abilities);
  }

  getAbilities(): Observable<number> {
    return this.pokeAbilitiesSubject.asObservable();
  }
}
