import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Travel } from '../models/Travel';
import { TRAVEL_URL } from '../constants/urlPaths';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Review } from '../models/Review';
import { Router } from '@angular/router';
import { RoutePaths } from '../constants/RoutePaths';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  travelURL = TRAVEL_URL;

  constructor(private httpClient: HttpClient, private router: Router) { }

  loadTravels(): Observable<Travel[]>
  {
    return this.httpClient.get<Travel[]>(this.travelURL);
  }

  getSingleTravel(travelId: number): Observable<Travel>
  {
    return this.httpClient.get<Travel>(`${this.travelURL}/${travelId}`);
  }

  makeReservation(user: User, travel: Travel)
  {
    const travelReservationList: string[] = [...travel.reservedBy, user.username]; 
    user.myTravels.forEach((travel) => {
      if(travel.id === travel.id)
        travel.reservedBy.push(user.username);
    });
    this.httpClient.patch(`${this.travelURL}/${travel.id}`, { reservedBy: travelReservationList}).subscribe();
  }

  removeReservation(user: User, travel: Travel)
  {
    const travelReservationList: string[] = travel.reservedBy.filter((userWhoReserved) => userWhoReserved !== user.username);
    this.httpClient.patch(`${this.travelURL}/${travel.id}`, { reservedBy: travelReservationList }).subscribe();
  }

  rateTravel(travel: Travel, review: Review)
  {
    const newAverage = ((travel.averageRating + review.rating) / (travel.reviews.length + 1)).toFixed(2);
    const newReviews = [...travel.reviews];
    newReviews.push(review);
    this.httpClient.patch(`${this.travelURL}/${travel.id}`, { averageRating: newAverage, reviews: newReviews }).subscribe(() => {
      alert("Rating was successful");
      this.router.navigate([RoutePaths.HOME]);
    });
  }

  markTravelComplete(travel: Travel, username: string)
  {
    const newCompletedBy: string[] = [...travel.completedBy];
    newCompletedBy.push(username);
    this.httpClient.patch(`${this.travelURL}/${travel.id}`, { completedBy: newCompletedBy }).subscribe(() => {
      alert("Travel was marked as completed");
    });
  }
}
