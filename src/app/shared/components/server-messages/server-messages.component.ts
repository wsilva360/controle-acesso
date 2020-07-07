import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-messages',
  templateUrl: './server-messages.component.html',
  styleUrls: ['./server-messages.component.css']
})
export class ServerMessagesComponent implements OnInit {

  // ATRIBUTOS
  @Input('server-messages') serverMessages: string[] = null;


  // CONSTRUTOR
  constructor() { }


  // MÉTODOS PÚBLICOS
  ngOnInit() {
  }

}
