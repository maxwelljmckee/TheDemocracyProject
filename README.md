# TheDemocracyProject

## Purpose
The Democrac yProject is born of a desire to provide solutions to a few simple questions: Why are there so many roadblocks to civic engagement, and why do we only get to vote every 2-4 years? If we all have computers in our pockets, why is it so difficult to get information about our representatives, what they're up to, and how to contact them?  
•  
When you register with a zip code, The Democracy Project automatically connects you with your state and district officials. From there you can follow as many other representatives as you would like, giving you easy access to all their socials and contacts, as well as voting statistics and more in one centralized hub. Plus, as a registered user you'll be able to follow active bills as they move through congress. You'll have access to summaries and discussion boards to make informed decisions on the issues, and then you can let your representatives know how you feel with realtime voting, giving you a direct line of feedback to your representatives on the issues that matter.


## Technologies Used
**Frontend** || React • React-Redux • Chart.js • CSS • Animista  
**Backend** || Flask • SQLAlchemy / Alembic • PostgreSQL • ProPublica Congress API • Google Civic Information API


## Getting Started
- Grab your smartphone
- Navigate to <a href='https://thedemocracyproject.herokuapp.com/'>https://thedemocracyproject.herokuapp.com/</a>
  - ( it is highly recommended that you view the app on a mobile device as it was conceived and designed for mobile )
- Login as a Demo User or register for an account
- Check out the mission statement in the hamburger menu for more info, or just get started browsing!


<img src='./frontend/readme_gifs/login-demo.gif' />


## Key Features
With The Democracy Project, users:
- are automatically connected with their state and district representatives in congress
- can follow other members of congress
- can upvote/downvote any members of congress for realtime approval ratings
- can follow active bills through congress
- can upvote/downvote on bills for realtime approval ratings
- can participate in community discussion threads


<img src='./frontend/readme_gifs/bills-demo.gif' />


## Roadblocks
#### Heroku Postgres Database Limitations
- Without a paid subscription to heroku db, you are only allowed 10,000 db rows across all of your tables. I would have liked to add many more features, such as adding individual vote-tracking and statement-tracking to every congressional representative, as well as a great deal more seed data. Given this constraint however, it is easy to see how one would run out of space very quickly, so I have resolved to defer these features to a later update of the application.


## Future Updates
#### Community Discussion Boards
- Users can create and contribute to their own conversations in a dedicated community section of the platform.

#### More Static Data
- There is practically no end to the amount of data available on Congress. If this project ever becomes a production-level application, surely it will be more comprehensive in its coverage of the available data.
- Additionally, I would like to dedicate another portion of the platform to offering basic definitions and educational resources on the terms and functions of government.

#### Background Process Updates and Notifications
- The App should automatically update its databases with the latest information from the ProPublica Congress API.
- Users could then receive notifications of status-changes to the representatives and bills they follow.

#### Honestly, the sky's the limit
