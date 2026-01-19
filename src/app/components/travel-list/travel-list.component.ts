import { Component, OnInit } from '@angular/core';
import { TransportationMeans } from 'src/app/models/TransportationMeans';
import { Travel } from 'src/app/models/Travel';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {
  public travels: Travel[] = [];
  public filteredTravels: Travel[] = [...this.travels];
  public destinations: string[] = [];
  private pickedDestination: string = "allDestinations";
  private pickedTransportationMean: TransportationMeans = TransportationMeans.ALL;
  private pickedMaxDistance: number;
  private pickedMaxPrice: number;
  private pickedMaxTravelTime: number;

  constructor(private travelService: TravelService) { }

  ngOnInit(): void 
  {
    this.travelService.loadTravels().subscribe((travels) => {
      this.travels = travels;
      this.filteredTravels = [...this.travels];
      let initialDestinations: string[] = [];
      this.travels.forEach(travel => initialDestinations.push(travel.destination));
      this.destinations = initialDestinations.filter((destination, index, destinations) => destinations.indexOf(destination) === index);
    });
  }

  filterTravels($event: Event)
  {
    const selectedTransportationMean = parseInt(($event.target as HTMLSelectElement).value);
    this.pickedTransportationMean = selectedTransportationMean;
    this.updateFilteredTravels();
  }

  setDestination($event: Event)
  {
    const { value: selectedDestination } = ($event.target as HTMLSelectElement);
    this.pickedDestination = selectedDestination;
    this.updateFilteredTravels();
  }

  setMaxDistance($event: Event)
  {
    const { value: distance } = ($event.target as HTMLInputElement);
    this.pickedMaxDistance = parseFloat(distance);
    this.updateFilteredTravels();
  }

  setMaxPrice($event: Event)
  {
    const { value: maxPrice } = ($event.target as HTMLInputElement);
    this.pickedMaxPrice = parseFloat(maxPrice);
    this.updateFilteredTravels();
  }

  setMaxTravelTime($event: Event)
  {
    const { valueAsNumber: maxTravelTime } = ($event.target as HTMLInputElement);
    this.pickedMaxTravelTime = maxTravelTime;
    this.updateFilteredTravels();
  }

  private updateFilteredTravels(): void
  {
    this.filteredTravels = this.travels.filter((travel) => this.filterDestinations(travel))
                                       .filter((travel) => this.filterTransportationMean(travel))
                                       .filter((travel) => this.filterDistance(travel))
                                       .filter((travel) => this.filterMaxPrice(travel))
                                       .filter((travel) => this.filterMaxTravelTime(travel));
  }

  private filterDestinations(travel: Travel): Travel
  {
    if(this.pickedDestination === "allDestinations")
    {
      return travel;
    }
    else
    {
      if(travel.destination === this.pickedDestination)
        return travel;
    }
  }

  private filterTransportationMean(travel: Travel): Travel
  {
    if(this.pickedTransportationMean === TransportationMeans.ALL)
    {
      return travel;
    }
    else
    {
      if(travel.transportationMean === this.pickedTransportationMean)
        return travel;
    }
  }

  private filterDistance(travel: Travel): Travel
  {
    if(isNaN(this.pickedMaxDistance))
    {
      return travel;
    }
    else
    {
      if(travel.distanceInKM <= this.pickedMaxDistance)
      {
        return travel;
      }
    }
  }

  private filterMaxPrice(travel: Travel): Travel
  {
    if(isNaN(this.pickedMaxPrice))
    {
      return travel;
    }
    else
    {
      if(travel.priceInEUR <= this.pickedMaxPrice)
      {
        return travel;
      }
    }
  }

  private filterMaxTravelTime(travel: Travel): Travel
  {
    if(isNaN(this.pickedMaxTravelTime))
    {
      return travel;
    }
    else
    {
      if(travel.travelTimeInMinutes <= this.pickedMaxTravelTime)
      {
        return travel;
      }
    }
  }


}
