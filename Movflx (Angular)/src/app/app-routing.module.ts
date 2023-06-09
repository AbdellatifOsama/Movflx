import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieComponent } from './movie/movie.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { TvShowComponent } from './tv-show/tv-show.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'movie',component:MovieComponent},
  {path:'tv-show',component:TvShowComponent},
  {path:'pricing',component:PricingComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'moviedetails/:id',component:MovieDetailsComponent},
  {path:'tvdetails/:id' ,component:TvDetailsComponent},
  {path:'search',component:SearchComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
