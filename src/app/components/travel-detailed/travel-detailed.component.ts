import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/Review';
import { TransportationMeans } from 'src/app/models/TransportationMeans';
import { Travel } from 'src/app/models/Travel';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-travel-detailed',
  templateUrl: './travel-detailed.component.html',
  styleUrls: ['./travel-detailed.component.css']
})
export class TravelDetailedComponent implements OnInit {
  travelId: number;
  travel: Travel;
  user: User;
  reviewText: string;
  rating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private travelService: TravelService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe((user) => {
      this.user = user;
    });

    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.travelId = parseInt(params.get('travelId'));
      console.log(this.travelId);

      this.travelService.getSingleTravel(this.travelId).subscribe((travel) => {
        this.travel = travel;
      });
    });
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

  userCompletedTravel(): boolean
  {
    return this.travel.completedBy.includes(this.user.username);
  }

  setReviewText($event: Event)
  {
    const { value: replyText } = ($event.target as HTMLTextAreaElement);
    this.reviewText = replyText;
  }

  setRating($event: Event)
  {
    const { valueAsNumber: travelRating } = ($event.target as HTMLInputElement);
    if(travelRating >= 0 && travelRating <= 5)
    {
      this.rating = travelRating;
    }

    if(travelRating < 0)
    {
      ($event.target as HTMLInputElement).value = "0";
    }

    if(travelRating >= 5)
    {
      ($event.target as HTMLInputElement).value = "5";
    }
  }

  submitReview()
  {
    const review: Review = {
      rating: this.rating,
      reviewText: this.reviewText,
      username: this.user.username
    };

    this.travelService.rateTravel(this.travel, review);
  }

}
