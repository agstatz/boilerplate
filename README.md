# Boilerplate

Boilerplate is a web application created to augment the dining experience on campus at Purdue University. It was created for CS 40700 at Purdue University in Spring 2022. The application builds upon the food information that is available for the next week.

## General Overview
The project utilizes a web scraper created using Cheerio and Puppeteer to pull current information from Purdue Dining's system and into our database, where it is then accessible for users to view. The information can be catalogued into meal plans, which is one of the primary features of the application. In addition to this feature, users can interact with others, as the application offers a commenting system, friend system, the ability to see where others are eating.

The frontend consists of React Bootstrap styled components and Redux Persist for state management. Backend utilized Node with MongoDB (Mongoose specifically). 

## Images
Below are some images of the application's primary pages

- Home page
<br><br><img src="https://i.imgur.com/pHP6O8N.png" alt="Boilerplate home page" width="800" ></img>

- Popular page
<br><br><img src="https://i.imgur.com/DpyZ3WW.png" alt="Boilerplate popular page" width="800" ></img>

- Profile Page
<br><br><img src="https://i.imgur.com/ZpvW0CI.png" alt="Boilerplate profile page" width="800" ></img>

- Dining Courts 
<br><br><img src="https://i.imgur.com/aaz55yi.png" alt="Boilerplate dining courts page" height="600" ></img>

- Meal Plan
<br><br><img src="https://i.imgur.com/awRHDG9.png" alt="Boilerplate meal plan" height="600" ></img>

- Creating a Meal Plan
<br><br><img src="https://i.imgur.com/Dnwpdjy.png" alt="Boilerplate creating meal plan" height="600" ></img>

## Running the development environment
In order to run the development environment, make sure first to run ***npm install*** in both the /backend/ and /frontend/ folders.

In the frontend folder, to run the client for development, enter
```npm start```

In the backend folder, to run the server for development, enter
```node index.js```

Access the webpage at ***http://localhost:3000***, API commands are passed on port 3001. (The application will not work intended without the correct database implementation, so this would need to be configured again after the database no longer runs)
