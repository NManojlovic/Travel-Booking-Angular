# Travel Booking & Review SPA (Angular)

## Project Overview
This is a robust Single Page Application (SPA) developed with **Angular** to simulate a travel booking platform. The project focuses on complex state management, dynamic routing, and seamless interaction with a RESTful API.

The primary objective was to implement a scalable frontend architecture using modern Angular patterns, ensuring data consistency and a smooth user experience without page reloads.

## Key Features
*   **User Authentication:** Full login and registration flow with session tracking.
*   **Dynamic Travel Catalog:** Real-time filtering by destination, price, distance, and transportation type.
*   **Booking System:** Interactive "Travel Cart" for managing reservations.
*   **Review & Rating Engine:** Custom-built logic for submitting reviews and calculating real-time average ratings.
*   **Mock REST API:** Integrated with `json-server` to perform full CRUD operations (GET, POST, PATCH).

## Technical Implementation
*   **State Management:** Utilized **RxJS BehaviorSubjects** and Observables to broadcast user state and travel data across the application.
*   **Modular Architecture:** Organized into reusable components and singleton services for clean separation of concerns.
*   **Design Note:** The user interface is intentionally minimalist and utility-focused. The core emphasis of this project was on **architectural integrity, data flow, and logic implementation** rather than advanced CSS styling.

## Tech Stack
*   **Framework:** Angular 11+
*   **Language:** TypeScript
*   **Reactive Programming:** RxJS
*   **Backend Simulation:** JSON-Server
*   **Styling:** CSS3 (Responsive Layouts)

## How to Run
1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the mock database: `json-server --watch mockDatabase.json`
4.  Run the application: `ng serve`
5.  Access via `http://localhost:4200`
