import { Component, OnInit, Input } from '@angular/core';
import { TransportationMeans } from 'src/app/models/TransportationMeans';
import { Travel } from 'src/app/models/Travel';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'single-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  @Input() travel: Travel;
  private user: User = null;
  reservedBySignedInUser: boolean = false;
  travelIsCompleted: boolean = false;
  
  constructor(
    private loginService: LoginService,
    private travelService: TravelService
  ) { }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe((user) => {
      this.user = user;
    });

    if(this.travel.reservedBy.includes(this.user.username))
      this.reservedBySignedInUser = true
    else
      this.reservedBySignedInUser = false;
    
    if(this.userCompletedTravel())
    {
      this.travelIsCompleted = true;
    }
    else
    {
      this.travelIsCompleted = false;
    }
  }

  determineTransportationMean(): string
  {
    if(this.travel.transportationMean === TransportationMeans.AIRPLANE)
    {
      return "fa fa-solid fa-plane";
    }

    if(this.travel.transportationMean === TransportationMeans.BUS)
    {
      return "fa fa-bus";
    }

    if(this.travel.transportationMean === TransportationMeans.TRAIN)
    {
      return "fa fa-train";
    }
  }

  userIsLoggedIn(): boolean
  {
    return this.user.username !== "";
  }

  userCanReview(): boolean
  {
    return this.travel.completedBy.includes(this.user.username);
  }

  makeReservation()
  {
    this.travelService.makeReservation(this.user, this.travel);
    this.reservedBySignedInUser = true;
    this.loginService.addTravelToUsersCart(this.user, this.travel);
  }

  undoReservation()
  {
    alert("Remove from cart");
    this.travelService.removeReservation(this.user, this.travel);
    this.reservedBySignedInUser = false;
    this.loginService.removeTravelFromCart(this.user, this.travel);
  }

  userCompletedTravel(): boolean
  {
    return this.travel.completedBy.includes(this.user.username);
  }

  markTravelComplete($event)
  {
    this.travelService.markTravelComplete(this.travel, this.user.username);
    this.travelIsCompleted = true;
  }
}
