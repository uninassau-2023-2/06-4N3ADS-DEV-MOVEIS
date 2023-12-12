import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  
  public senhasTotal: number = 0;

  public inputNovaSenha: string = "";
  
  public senhasArray: { [key: string]: string[] } = {
    'SG': [],
    'SP': [],
    'SE': []
  };

  private tempoMedioSG: number = 0; 
  private tempoMedioSP: number = 0;
  private tempoMedioSE: number = 0;

  public tempoMedioSGFormatado: string = "0.00";
  public tempoMedioSPFormatado: string = "0.00";
  public tempoMedioSEFormatado: string = "0.00";

  public senhasNaoAntedidas: string = "0.00";

  constructor() { }

  novaSenha(tipoSenha: string = "") {
    if (tipoSenha == "SG") {
      this.senhasTotal++;
      this.senhasNaoAntedidas = (this.senhasTotal * 5/100).toFixed(2);
      this.inputNovaSenha =
      new Date().getFullYear().toString().substring(2, 4) +
      (new Date().getMonth() + 1).toString().padStart(2, '0') +
      new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray["SG"].length + 1).toString().padStart(2, '0');
      this.senhasArray["SG"].push(this.inputNovaSenha);
      this.atenderSG();
    } else if (tipoSenha == "SP") {
      this.senhasTotal++;
      this.senhasNaoAntedidas = (this.senhasTotal * 5/100).toFixed(2);
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray["SP"].length + 1).toString().padStart(2, '0');
        this.atenderSP();
      this.senhasArray["SP"].push(this.inputNovaSenha);
    } else if (tipoSenha == "SE") {
      this.senhasTotal++;
      this.senhasNaoAntedidas = (this.senhasTotal * 5/100).toFixed(2);
      this.inputNovaSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') +
        '-' +
        tipoSenha +
        (this.senhasArray["SE"].length + 1).toString().padStart(2, '0');
      this.senhasArray["SE"].push(this.inputNovaSenha);
      this.atenderSE();
    }
    console.log(this.senhasArray);
  }

  private calcularTempoDeAtendimentoParaSG(): number {
    const tempoMedio = 3;
    const variacao = Math.floor(Math.random() * 8);
    return tempoMedio + variacao;
  }

  private calcularTempoDeAtendimentoParaSP(): number {
    const tempoMedio = 5;
    const variacao = Math.floor(Math.random() * 10);
    return tempoMedio + variacao;
  }

  private calcularTempoDeAtendimentoParaSE(): number {
    const randomValue = Math.random(); 
    if (randomValue < 0.05) {
      return 5; 
    } else {
      return 1; 
    }
  }

  atenderSG() {
    const tempoAtendimento = this.calcularTempoDeAtendimentoParaSG(); 
    if(this.senhasArray["SG"].length === 0){
      this.tempoMedioSG = tempoAtendimento;
    }
    this.tempoMedioSG = ((this.tempoMedioSG * this.senhasArray["SG"].length) + tempoAtendimento) / (this.senhasArray["SG"].length + 1);
    this.tempoMedioSGFormatado = this.tempoMedioSG.toFixed(2);
  }

  atenderSP() {
    const tempoAtendimento = this.calcularTempoDeAtendimentoParaSP(); 
    if(this.senhasArray["SP"].length === 0){
      this.tempoMedioSP = tempoAtendimento;
    }
    this.tempoMedioSP = ((this.tempoMedioSP * this.senhasArray["SP"].length) + tempoAtendimento) / (this.senhasArray["SP"].length + 1);
    this.tempoMedioSPFormatado = this.tempoMedioSP.toFixed(2);
  }

  atenderSE() {
    const tempoAtendimento = this.calcularTempoDeAtendimentoParaSE(); 
    if(this.senhasArray["SE"].length === 0){
      this.tempoMedioSE = tempoAtendimento;
    }
    this.tempoMedioSE = ((this.tempoMedioSE * this.senhasArray["SE"].length) + tempoAtendimento) / (this.senhasArray["SE"].length + 1);
    this.tempoMedioSEFormatado = this.tempoMedioSE.toFixed(2);
  }

  getUltimasSenhas(): { SG: string[], SP: string[], SE: string[] } {
    const ultimasSenhasSG = this.senhasArray["SG"].slice(-5).reverse();
    const ultimasSenhasSP = this.senhasArray["SP"].slice(-5).reverse();
    const ultimasSenhasSE = this.senhasArray["SE"].slice(-5).reverse();

    return {
      SG: ultimasSenhasSG,
      SP: ultimasSenhasSP,
      SE: ultimasSenhasSE
    };
  }
}

export default SenhasService;