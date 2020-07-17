import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  // VARIÁVEIS
  usuarioLogado: string;


  // CONSTRUTOR
  constructor() { 
    this.usuarioLogado = "Robô Authentication";

    //localStorage.setItem('user.cpf', '07703810819');
  }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
  }

}
