import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TravelComponent } from './components/travel/travel.component';
import { TravelListComponent } from './components/travel-list/travel-list.component';
import { LoginComponent } from './components/login/login.component';
import { RoutePaths } from './constants/RoutePaths';
import { RegisterComponent } from './components/register/register.component';
import { TravelCartComponent } from './components/travel-cart/travel-cart.component';
import { TravelDetailedComponent } from './components/travel-detailed/travel-detailed.component';

const appRoutes: Routes = [
  { path: RoutePaths.HOME, component: TravelListComponent },
  { path: RoutePaths.LOGIN, component: LoginComponent },
  { path: RoutePaths.REGISTER, component: RegisterComponent },
  { path: RoutePaths.TRAVEL_CART, component: TravelCartComponent },
  { path: "travel-detailed",
    children: [
      { path: ":travelId",  component: TravelDetailedComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TravelComponent,
    TravelListComponent,
    LoginComponent,
    RegisterComponent,
    TravelCartComponent,
    TravelDetailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
