import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  //Defining Attributes
  movieName:string = '';
  imgSrcPrefix:string = 'https://image.tmdb.org/t/p/w500/';

  ngOnInit(): void {
  }

  //Search Bar
  searchCollapse(IDName:string){
    const searchContainer = document.getElementById(IDName)?.classList;
    if(searchContainer?.contains('d-none') == false){
      searchContainer.add('d-none');
    }
    else if(searchContainer?.contains('d-none')){
      searchContainer.remove('d-none');
    }
  }
}

