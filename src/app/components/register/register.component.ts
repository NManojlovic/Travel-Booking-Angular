import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = "";
  surname: string = "";
  email: string = "";
  phoneNumber: string = "";
  address: string = "";
  username: string = "";
  password: string = "";
  favoriteDestinations: string[] = [];
  favoriteTravelMeans: string[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  setName($event: Event) {
    this.name = ($event.target as HTMLInputElement).value;
  }

  setSurname($event: Event) {
    this.surname = ($event.target as HTMLInputElement).value;
  }

  setEmail($event: Event) {
    this.email = ($event.target as HTMLInputElement).value;
  }

  setPhoneNumber($event: Event) {
    this.phoneNumber = ($event.target as HTMLInputElement).value;
  }

  setAddress($event: Event) {
    this.address = ($event.target as HTMLInputElement).value;
  }

  setUsername($event: Event) {
    this.username = ($event.target as HTMLInputElement).value;
  }

  setPassword($event: Event) {
    this.password = ($event.target as HTMLInputElement).value;
  }

  // Logic for handling destination checkboxes
  onDestinationChange($event: Event) {
    const checkbox = $event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.favoriteDestinations.push(checkbox.value);
    } else {
      this.favoriteDestinations = this.favoriteDestinations.filter(d => d !== checkbox.value);
    }
  }

  // Logic for handling travel means checkboxes
  onMeanChange($event: Event) {
    const checkbox = $event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.favoriteTravelMeans.push(checkbox.value);
    } else {
      this.favoriteTravelMeans = this.favoriteTravelMeans.filter(m => m !== checkbox.value);
    }
  }

  registerAccount($event: Event) {
    $event.preventDefault();

    // Basic validation
    if (!this.name || !this.surname || !this.username || !this.password || !this.email) {
      alert("Please fill out all required fields");
      return;
    }

    const newUser: User = {
      name: this.name,
      surname: this.surname,
      contactData: [
        { email: this.email },
        { phoneNumber: this.phoneNumber },
        { address: this.address }
      ],
      favoriteDestinations: this.favoriteDestinations,
      favoriteTravelMeans: this.favoriteTravelMeans,
      username: this.username,
      password: this.password,
      myTravels: []      
    }

    this.loginService.registerUser(newUser);
  }
}