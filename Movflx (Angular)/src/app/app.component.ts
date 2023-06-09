import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor( private _Router:Router) {
  }
  title = 'Movflx';
  isLoginPageActive = new BehaviorSubject(true);
  currentActiveLink ='';
  isLoaded = new BehaviorSubject(false)
  ngOnInit(): void {
    this._Router.events.subscribe(
      (event)=>{
        if(event instanceof NavigationEnd && event.url) {
          this.currentActiveLink = event.url;
          document.documentElement.style.overflow = 'hidden';
          this.isLoaded.next(false)
          setTimeout(() => {
            this.isLoaded.next(true)
            document.documentElement.style.overflow = 'auto';
          }, 1500);
          if(this.currentActiveLink == '/login'){
            this.isLoginPageActive.next(false);
          }
          else{
            this.isLoginPageActive.next(true);
          }
        }
        window.scroll(0,0)
      }
    )
  }
}
