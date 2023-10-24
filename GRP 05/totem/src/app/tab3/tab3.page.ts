import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public alunos = [
    {
      img: "../../assets/images/alunos/Andressa.png",
      matricula: "01561006",
      nome: "Andressa",
      sobrenome: "Honorio"
    },
    {
      img: "../../assets/images/alunos/Gabriel.png",
      matricula: "01560937",
      nome: "Gabriel",
      sobrenome: "Ferreira"
    },
    {
      img: "../../assets/images/alunos/Daniel.png",
      matricula: "01482352",
      nome: "José",
      sobrenome: "Daniel"
    },
    {
      img: "../../assets/images/alunos/Julia.png",
      matricula: "01561550",
      nome: "Júlia",
      sobrenome: "Ellen"
    },
    {
      img: "../../assets/images/alunos/Lucas.png",
      matricula: "01561234",
      nome: "Lucas",
      sobrenome: "Kaynnã"
    },
    {
      img: "../../assets/images/alunos/Wallace.png",
      matricula: "01561145",
      nome: "Wallace",
      sobrenome: "Martins"
    }

  ]

  constructor() {}

}
