import { Travel } from "./Travel";

export interface User
{
    id?: number,
    name: string,
    surname: string,
    contactData: [
        { email: string },
        { phoneNumber: string },
        { address: string }
    ],
    favoriteDestinations: string[],
    favoriteTravelMeans: string[],
    username: string,
    password: string,
    myTravels: Travel[]
}