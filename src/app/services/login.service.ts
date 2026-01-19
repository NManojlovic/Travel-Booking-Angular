import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { RoutePaths } from '../constants/RoutePaths';
import { USERS_URL } from '../constants/urlPaths';
import { Travel } from '../models/Travel';
import { Review } from '../models/Review';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private USERS_URL = USERS_URL;
  private loggedInUserSource = new BehaviorSubject<User>({
    id: -1,
    name: "",
    surname: "",
    contactData: [
      { email: "" },
      { phoneNumber: "" },
      { address: "" }
    ],
    favoriteDestinations: [],
    favoriteTravelMeans: [],
    username: "",
    password: "",
    myTravels: []
  });

  sharedUser: Observable<User> = this.loggedInUserSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  attemptLogin(loginData: {username: string, password: string}): Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${this.USERS_URL}?username=${loginData.username}&password=${loginData.password}`);
  }

  broadcastUser(user: User)
  {
    this.loggedInUserSource.next(user);
  }

  getLoggedInUser()
  {
    return this.sharedUser;
  }

  registerUser(newUser: User)
  {
    this.httpClient.get<Array<any>>(`${this.USERS_URL}?username=${newUser.username}`)
                   .pipe(tap((data) => {
                    if(data.length === 0)
                    {
                      this.httpClient.post(this.USERS_URL, newUser).subscribe((value) => {
                        console.log(value);
                        alert("Successful registration");
                        this.router.navigate([RoutePaths.LOGIN])
                      });
                    }
                    else
                    {
                      alert("Username taken");
                    }
                   }))
                   .subscribe();
  }

  addTravelToUsersCart(user:User, travel: Travel)
  {
    const usersTravels: Travel[] = [...user.myTravels];
    usersTravels.push(travel);
    travel.reservedBy.push(user.username);
    user.myTravels.push(travel);
    this.httpClient.patch(`${this.USERS_URL}/${user.id}`, {myTravels: usersTravels}).subscribe(() => {
      this.loggedInUserSource.next(user);
    });
  }

  removeTravelFromCart(user: User, travel: Travel)
  {
    const usersTravels: Travel[] = user.myTravels.filter((usersTravels) => usersTravels.id !== travel.id);
    usersTravels.forEach((userTravel, index) => {
      if(userTravel.id === travel.id)
        usersTravels.splice(index, 1);
    });

    user.myTravels = usersTravels;

    this.httpClient.patch(`${this.USERS_URL}/${user.id}`, { myTravels: usersTravels }).subscribe(() => {
      this.loggedInUserSource.next(user);
    });
  }
}
