# Movie App

## Overview

This Next.js project is a simple movie management application with features like user authentication, movie creation, editing, and listing. The project utilizes popular libraries and frameworks such as React, Bootstrap, Mantine, and more.

## Project Structure

The project is organized into four main pages:

1. **Sign In Page**
    - File: `pages/signin.js`
    - Description: Handles user authentication with hardcoded credentials for demonstration purposes.

2. **Movie List Page**
    - File: `pages/movielist.js`
    - Description: Displays a paginated list of movies fetched from the server. Provides navigation links to add a new movie and logout.

3. **Create Movie Page**
    - File: `pages/createmovie.js`
    - Description: Contains the `NewMovieForm` component for creating a new movie entry. The form includes fields for the movie title, publishing year, and the option to upload a poster image.

4. **Edit Movie Page**
    - File: `pages/editmovie.js`
    - Description: Utilizes the Next.js framework with state management using `useState` and `useEffect` hooks. Fetches specific movie details using the movie ID from the router query parameters.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-app.git
   ```