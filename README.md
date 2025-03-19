# Bunco for Breast Cancer Fundraiser

**Bunco for Breast Cancer Fundraiser** is an interactive web application designed for participants of the Bunco for Breast Cancer event. This application allows users to browse and keep track of baskets available for the raffle. It helps users select their favorite baskets and store them for future ticket usage. The event organizers can also manage the baskets, making it easy to input new baskets, edit, or delete existing ones.

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation Instructions](#installation-instructions)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Acknowledgements](#acknowledgements)

## Description

The **Bunco for Breast Cancer Fundraiser** app is designed to facilitate the annual Bunco fundraiser event. It allows participants to log in, view baskets available for raffle, and track which baskets they are interested in for placing their raffle tickets later. Users can also mark their favorite baskets to keep a record of them.

Organizers or admins can manage the basket data, add new baskets, and remove old ones. This app ensures that users can view the available baskets in a carousel, get detailed information about each, and know how to use their raffle tickets accordingly.

## Features

- **User Authentication**: Users can log in and track the baskets they are interested in.
- **Favorite Baskets**: Users can mark baskets as their favorites to track which baskets they might want to place their raffle tickets into.
- **Admin Panel**: Admins can manage baskets, including adding new baskets, editing existing ones, and deleting baskets that are no longer available.
- **Basket Carousel**: Users can browse baskets in a carousel-style display for easier navigation.
- **Basket Details**: Each basket comes with a name, description, and content to help users decide where to place their tickets.

## Technologies Used

- **Frontend**: 
  - **React**: For building the user interface.
  - **React Router**: For managing navigation between different views (Home, Favorites, Admin Panel).
  - **SCSS**: For styling the application with a clean, elegant design, focusing on shades of pink and accents of gold.
  
- **Backend**: 
  - **Node.js**: Server-side runtime for handling requests.
  - **Express**: Web framework for routing and handling HTTP requests.
  - **MongoDB**: NoSQL database to store user data and basket information.
  - **Mongoose**: ODM (Object Data Modeling) for MongoDB.
  - **CORS**: Middleware for handling cross-origin requests between frontend and backend.

## Installation Instructions

### 1. Clone the repository
git clone <repository-url> cd <project-folder>
cd client npm install

### 2. Install dependencies
- Install frontend dependencies:

cd server npm install
- Install backend dependencies:


### 3. Set up Environment Variables
Create a `.env` file in the **server** directory and add the necessary environment variables, such as:
MONGO_URI=<your-mongo-db-uri> PORT=5050


### 4. Running the Application

- **Start the Backend (Server)**:
cd server npm start


- **Start the Frontend (React App)**:
cd client npm start



The app should now be running locally on `http://localhost:3000` (frontend) and `http://localhost:5050` (backend).

## Usage

### User Flow: 
- **No Sign In**: Users can still see the baskets that the admins entered.
- **Sign In**: Users log in with their username. Once logged in, users can access the favorites feature.
- **Favorite Baskets**: Users can mark their favorite baskets to track which ones they might want to place their raffle tickets in later.
- **Favorites Page**: Users can see a carousel of their favorite baskets with detailed information on each.
- **Admin Flow**: Admins can log in to manage the baskets by adding new ones, editing existing ones, or deleting outdated ones. Admins also have the option to delete all baskets if necessary.

### Note: 
- **Raffle Tickets**: The app helps users track the baskets they are interested in for later use with their raffle tickets, but users are not voting on baskets. The main purpose is to mark baskets for future ticket placement.

## Contributing

If you'd like to contribute to the project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request with a description of your changes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **Bunco for Breast Cancer**: This app was developed to support and track the fundraising event for breast cancer.
- **React Docs**: For comprehensive documentation on React concepts and patterns.
- **Node.js & Express Docs**: For setting up the backend and API endpoints.

---


