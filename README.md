# Job Listing Application

## Introduction
This React-based web application is designed to help users search and apply for jobs effectively. It utilizes Redux for state management and Material-UI for a polished user interface, providing functionality such as filtering jobs based on various criteria and infinite scrolling for job listings.

## Features
- **Dynamic Job Search**: Users can search for jobs using filters like location, job role, experience, and more.
- **Infinite Scrolling**: Enhances user experience by loading jobs as the user scrolls, reducing initial load times.
- **Responsive Design**: The application is fully responsive, providing an optimal browsing experience on both desktops and mobile devices.

## Folder Structure
Below is the project's directory structure:

    |-- /public/                   # contains index.html
        |-- index.html                 
    |-- /src/                   
        |-- /jobComponents/         # contains all the components for showing in jobs section
        |-- /app            # configures and exports the Redux store, integrating reducers  like jobsReducer 
            |--store.js
        |--features
            |--jobSlice.js  #contains logic for fetching, filtering the state of job listings in application.
        |-- /shared/      # contains usable components such as for button and filterComponents
            |-- /buttons/   
            |-- /description/   
            |-- /filtersUi/
        |-- App.js
        |-- index.js
    |-- README.md    # contains details and well documentation for the project abd how to use the project
    |--requirements.txt   # contains the required dependencies that needs to be installed using npmi
