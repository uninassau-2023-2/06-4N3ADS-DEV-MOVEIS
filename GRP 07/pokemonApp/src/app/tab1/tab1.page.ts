import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCEPService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  areaBuscarPokemon: string = '52011210';
  areaBusca: any = {
    bairro: '',
    localidade: '', 
    logradouro: '',
    uf: ''
  };

  bulbasaurSkills: number = 5;

  constructor(
    private navCtrl: NavController,
    private pokeAPIService: PokeAPIService,
    private viaCepService: ViaCEPService
  ) {}

  buscarPokemon() {
    this.viaCepService.getViaCEPService(this.areaBuscarPokemon)
      .subscribe((value) => {
        this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
        this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
        this.areaBusca.localidade = ' - ' + JSON.parse(JSON.stringify(value))['localidade'];
        this.areaBusca.uf = '-' + JSON.parse(JSON.stringify(value))['uf'];

        console.log('Bulbasaur Skills antes de navegar para tab2:', this.bulbasaurSkills);
      
        this.navCtrl.navigateForward('/tabs/tab2', {
          queryParams: {
            bulbasaurSkills: this.bulbasaurSkills
            
          }
          
        });
      });

    this.pokeAPIService.getPokeAPIService();
  }
}
