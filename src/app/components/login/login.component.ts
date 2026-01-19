import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePaths } from 'src/app/constants/RoutePaths';
import { User } from 'src/app/models/User';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private loginService: LoginService,
              private router: Router) 
  { }

  ngOnInit(): void {
    this.username = "";
    this.password = "";
  }

  sendLoginRequest($event: Event)
  {
    $event.preventDefault();
    const loginData: {username: string, password: string} = {
      username: this.username,
      password: this.password
    };

    this.loginService.attemptLogin(loginData).subscribe((response) => {
      if(response.length === 0)
      {
        alert("Invalid credentials");
      }
      else
      {
        alert("Successful sign in");
        this.loginService.broadcastUser(response[0]);
        this.router.navigate([`${RoutePaths.HOME}`]);
      }
    });
  }

  setUsername($event: Event)
  {
    const { value: username } = ($event.target as HTMLInputElement);
    this.username = username;
  }

  setPassword($event: Event)
  {
    const { value: password } = ($event.target as HTMLInputElement);
    this.password = password;
  }

}
