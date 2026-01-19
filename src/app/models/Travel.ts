import { Review } from "./Review";
import { TransportationMeans } from "./TransportationMeans";

export interface Travel
{
    id: number,
    transportationMean: TransportationMeans,
    startingPoint: string,
    destination: string,
    distanceInKM: number,
    priceInEUR: number,
    travelTimeInMinutes: number,
    averageRating: number,
    reservedBy: string[],
    completedBy: string[],
    reviews: Review[]
}