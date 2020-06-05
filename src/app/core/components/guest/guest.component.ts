import { Component, OnInit, Input, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  // VARIÁVEIS
  isHidden = true;


  // CONSTRUTOR
  constructor() {
  }


  // MÉTODOS PÚBLICOS
  ngOnInit(){
  }

  logOut() {
    sessionStorage.clear();
    localStorage.clear();

    sessionStorage.removeItem('token'),
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user.idBeneficiario');
    localStorage.removeItem('user.nome');
    localStorage.removeItem('user.cpf');
    localStorage.removeItem('user.carteira');
    localStorage.removeItem('user.dataNascimento');
  }

}
