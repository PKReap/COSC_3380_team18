The code submitted contains the frontend and backend. For the frontend it contains

homepage.html, homepage.js ,index.html, login.js , styles/homepage.css, styles/login.css, admin.css, admim.html , admin.js

homepage.html contains the skeleton of the page the css styles it completely. The style we were going for was essential a netflix and spotify combination to explain our homepage contains a slider which is simillar to netflix homepage and spotify was also a inspiration for the frontend via the rating system and player.

Then the homepage.js essential was calling the backend to perform operation on the application. 

The admin page on the other hand has the list of users and operation to delete, change user type it also contain the reports for the genres, users added, and tracks added. The admin.js calls the backend.

For the backend folder contains the sql dump and the node js file which create the sql qureies as api call.

http://uhmusic.xyz/
Admin- Admin1 Password123
User- User1 Password123
Artist- Artist1 Password123


The back end contains server.js which is the main server loop runs our server. 

It only accepts POSTS requests and we are using pm2 to run the server.js forever on the server.

The server is hosted on Digial Oceans web hosting platform.

In src is connection.js and MySQLConnection.js. 

The connection.js contains employs the adapter pattern incase we wanted to switch to a different DBMS. 

connection.js on this github is reading config-test.json to connect to our local database. 

config.json is the file that contains information for how to connect to our hosted database on uhmusic.xyz

MySQLConnection.js contains all endpoints the frontend can hit to get information. It is a set of independent functions.

The dump file contains data-base-structure.sql which is the initial file we had use to generate the database as well as implemented the triggers.

It also contains Dump20220423.sql which is a self contained dump of our current database as of 4/23/2022

Inside of it is an implemtation of our triggers and all our schema structure.

The only difference between whats on the actual server is that connection.js is reading config.json instead of config-test.json

The way we implemented uploading is that the server recieves the files and stores in folder and in the database we store a link to where its stored.

If you want to run it locally with the frontend, do a ctrl-f find all on "uhmusic.xyz" and change them to "localhost:3000" on all .js files in the frontend.
