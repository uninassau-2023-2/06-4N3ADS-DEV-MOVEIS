import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private dado: any = 0;
  constructor() {}

  setDado(dado:any){
    this.dado = dado;
  }
  getDado(){
    return this.dado;
  }
}
