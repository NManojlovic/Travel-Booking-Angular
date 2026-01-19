import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/constants/RoutePaths';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routePaths = RoutePaths;
  user: User = null;


  constructor(
    private loginService: LoginService,
    private router: Router    
  ) { }

  ngOnInit(): void {
    this.loginService.getLoggedInUser().subscribe((user) => {
      this.user = user;
    });
  }

  userIsLoggedIn(): boolean
  {
    return this.user.username !== "";
  }

  logout()
  {
    this.loginService.broadcastUser({
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

    this.router.navigate([RoutePaths.LOGIN]);
  }

}
