import { Component, OnInit } from '@angular/core';

// Jquery
declare var $: any;

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  // CONSTRUTOR
  constructor() { }


  // MÉTODOS PÚBLICOS
  ngOnInit() { 
    this.initNavbar();
  }

  // Clique do menu resposivo 
  initNavbar() {
    $('.navbar-toggle').on('click', function(event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li').slice(-1).addClass('last-elements');

    $('.navigation-menu li.has-submenu a[id="menuresp"]').on('click', function(e) {
      if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
      }
    });
  }


}
