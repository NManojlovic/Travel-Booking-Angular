import { Component, OnInit } from '@angular/core';
import { emptyUser } from 'src/app/constants/DefaultObjects';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-travel-cart',
  templateUrl: './travel-cart.component.html',
  styleUrls: ['./travel-cart.component.css']
})
export class TravelCartComponent implements OnInit {
  user: User = emptyUser;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe((user) => {
      this.user = user;
    });
  }

  calculateTotalPrice(): number
  {
    if(this.user && this.user.myTravels)
    {
      return this.user.myTravels.reduce((previousValue, currentTravel) => previousValue + currentTravel.priceInEUR , 0);
    }
    else
    {
      return 0;
    }
  }

}
