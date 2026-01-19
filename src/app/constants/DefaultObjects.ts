import { User } from "../models/User";

export const emptyUser: User = {
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
};