
# Small-Talk

This is instant mesanger with live games. 
You are able to add, delete and chat with connections as well as play live games. 

Link to deployed site: https://small-talk-live.herokuapp.com/

It is built with React for the front end and an express server in the beack end. 
Both the server and client side of the app need to be running synchronously. The reposositories are as follows. 


Small-Talk-client: 
https://github.com/wilni/small-talk-client

Small-Talk-server: 
https://github.com/wilni/small-talk-server

<img width="700" alt="SmallTalk desktop" src="https://user-images.githubusercontent.com/81815266/186259073-dff09aea-0aed-4354-b48d-853343836464.png"  height="400">

<div>
<img width="350" alt="Screen Shot 2022-08-23 at 4 25 03 PM" src="https://user-images.githubusercontent.com/81815266/186259862-e36ced7b-c7bd-449e-ad94-345809929646.png">

<img width="350" alt="Screen Shot 2022-08-23 at 4 25 18 PM" src="https://user-images.githubusercontent.com/81815266/186259935-e99ed755-7400-49b6-bf48-58c28d81aa06.png">
</div
    
App Screenshots
    
    
## Tech Stack

#### Front End
- React
- Sass
- Js
- Axios

#### Back End
- Node Js
- Express 
- MySQL 
- Knex js
- Axios


#### OAuth
 - Auth0

 #### deployment
 - Heroku

## Install and Run

This app is built with React for the front end and an express server in the beack end. 
Both the server and client side of the app need to be running synchronously. The repos are as follows. 

Small-Talk-client: 
https://github.com/wilni/small-talk-client

Small-Talk-server: 
https://github.com/wilni/small-talk-server

For the client side: 

- clone the repository 
- run npm install
- run npm start 


For the server side: 
- install MySQL
- clone the repository
- configure knexfile.js file with SQL server info
- run npm install
- run node index.js


## dependencies

    //client 
    "axios": "^0.27.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dotenv": "^0.1.3",
    "react-router-dom": "5.3",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.0.7",
    "sass": "^1.54.0",
    "socket.io-client": "^4.5.1",
    "uniqid": "^5.4.0",
    
    //server
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "knex": "^2.2.0",
    "mysql": "^2.18.1",
    "socket.io": "^4.5.1",
    "uniqid": "^5.4.0"


## Lessons Learned

From this project I became familiar with a lot of new technologies and aspects of web developmet. I implemented only functional components and websockets wich were both new to me. This was also the first application wher I deployed not onlya front end but also a back end server. I had to navigate a few things to set up my production database and enviroment.


## next steps 

- add more games (simon, hangman)
- implement end to end encryption
- create a react native version to deploy app on iOS, android as well as the web.

## License

MIT License

Copyright (c) 2022 Wilniyobri Tavarez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
