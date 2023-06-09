import { Component, OnInit } from '@angular/core';
import { TmdbSearchService } from './../tmdb-search.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //attributes Defining
  current_page:number=1
  max_page_numbers:number = 0
  page_numbers:number[]=[]
  imgSrcPrefix:string='https://image.tmdb.org/t/p/w500/'
  searchText = new BehaviorSubject<string>(this._ActivatedRoute.snapshot.queryParams['keyword'])
  searchType = new BehaviorSubject<string>(this._ActivatedRoute.snapshot.queryParams['type'])
  searchResultList:any[]=[];
  //constructor
  constructor(private _TmdbSearchService:TmdbSearchService , private _ActivatedRoute:ActivatedRoute, private _Router:Router) {
    this.searchByMovies(this.searchType.getValue(), this.searchText.getValue() , this._ActivatedRoute.snapshot.queryParams['page'])
    this._ActivatedRoute.queryParams.subscribe(
      (params)=>{
        this.searchText.next(params['keyword'])
        this.searchType.next(params['type'])
      }
    )
  }

  ngOnInit(): void {
    const search:any = document.getElementById('search')
    const filterBy: any = document.getElementById('filter-by')
    this.paginator_init()
    
    //Filter By section
    filterBy.addEventListener('click' , ()=>{
      if(this.searchType.getValue() != filterBy.options[filterBy.selectedIndex].value){
        this.searchType.next(filterBy.options[filterBy.selectedIndex].value)
        this._Router.navigate([], {queryParams: {
          type: this.searchType.getValue()
        },
        queryParamsHandling: 'merge',
        });
      }
    })
    
    //Search on press on Enter Key
    this.searchText.subscribe(
      ()=>{
        document.addEventListener('keypress' , (event)=>{
          if(event.key == "Enter"){
            this._Router.navigate([] , { queryParams: { keyword: this.searchText.getValue() ,  type: this.searchType.getValue() , page: 1}});
          }
        })
      }
    )

    //response to new search input
    this._Router.events.subscribe(
      (event)=>{
        if(event instanceof NavigationEnd && event.url) {
          this.searchByMovies(this._ActivatedRoute.snapshot.queryParams['type'],this._ActivatedRoute.snapshot.queryParams['keyword'] , this._ActivatedRoute.snapshot.queryParams['page'])
          this.searchText.next(this._ActivatedRoute.snapshot.queryParams['keyword'])
        }
      }
    )

    //real time search
    search?.addEventListener("keyup",()=>{
      if(search.value != ''){
      this.searchByMovies(this.searchType.getValue(),search.value ,1)
      this.searchText.next(search.value)
      }
    })
  }

  //get search Data from Api
  searchByMovies(type:string , movieName:string , page:number){
  this._TmdbSearchService.getSearch(type,movieName,page).subscribe(
    (searchResultsResponse)=>{
      this.searchResultList=searchResultsResponse.results
      this.max_page_numbers = searchResultsResponse.total_pages
    }
    )
  }

  //Paginator Design
  paginator_init(){
    this._ActivatedRoute.queryParams.subscribe(params => {
      this.current_page = params['page'];
      this.current_page_check()
  });
  }
  current_page_check(){
    if (this.current_page == 1) {
      this.page_numbers = [this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
    else if(this.current_page == 2){
      this.page_numbers = [Number((this.current_page)) -1,this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
    else if(this.current_page == 3){
      this.page_numbers = [Number((this.current_page)) -2,Number((this.current_page)) -1,this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
    else if(this.current_page == this.max_page_numbers){
      this.page_numbers = [Number((this.current_page)) -4,Number((this.current_page)) -3,Number((this.current_page)) -2,Number((this.current_page)) -1,this.current_page]
    }
    else if(this.current_page == this.max_page_numbers - 1){
      this.page_numbers = [Number((this.current_page)) -3,Number((this.current_page)) -2,Number((this.current_page)) -1,this.current_page,Number((this.current_page)) + 1]
    }
    else if(this.current_page == this.max_page_numbers - 2){
      this.page_numbers = [Number((this.current_page)) -2,Number((this.current_page)) -1,Number((this.current_page)),Number((this.current_page)) + 1,Number((this.current_page)) + 2]
    }
    else{
            this.page_numbers = [this.current_page-2,this.current_page-1,this.current_page,Number((this.current_page)) + 1 ,Number((this.current_page)) + 2]
    }
  }
  page_request(page:any){
    this._Router.navigate([], {queryParams: {
      page: page
    },
    queryParamsHandling: 'merge',
  });
  }
  next(){
    this.current_page ++ 
    this._Router.navigate([], {queryParams: {
      page: this.current_page
    },
    queryParamsHandling: 'merge',
    });
  }
}
