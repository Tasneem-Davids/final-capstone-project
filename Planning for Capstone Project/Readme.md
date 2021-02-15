# Software Requirements Documentation


### Software Architecture 

*Which web stack will I use?*

I will be using the MERN stack to create my web application, the reason being, that I have become more familiar with React.js and will be creating my client side with Create React App. My server will be created usng Express.js, specifically with the express generator because it provides all the tools you will need for your server automatically. Lastly MongoDB will be my database of choice for my application to save data on.

*How will I deploy my app?*

My choice for deployment is Github and Heroku. I have found in the past few tasks in which I was required to deploy apps using Heroku, that it was quite easy and sufficient, as well as what I've become accustom to. So I feel heroku would be the way to go.

*How will I style my application?*

For this application I will using React Bootstrap as well as some custom css. React bootstrap has built in components that are so easy to use and they always make a web application look amazing. Also with any application I've made in past tasks, not everything is immediately going to look the way I would like, even when using bootstrap or react bootstrap, and that's where customizing my own css file for the components I create comes in handy. 


### System Requirements Specification

*How will the application work?*

I will be creating an application for displaying appointments, so for my client side, I will create functions that accepts user information and sends it to the server via axios to interact with the database. There will be a "register user" page as well as a "login" page to make sure only the user with the correct info can make changes to the data. A page with the appoinments will be available to display the appoinments but won't be interactive. The page where the interaction takes place will be seperate and need the login info in order to access. I will be creating a server that can communicate with the client and handle any requests made by the user. The server will also be connected to a MongoDB database in order to store, delete, update and send data back to the server.

*Who is most likely to use this application?*

Anyone could use this app for any appointments or plans they might have and need to keep track of but my app is aimed at doctors specifically to help them keep track of appoinments patients make. They can simply add something to their list of appoinments and make changes as they see fit.

*What makes my web app different?*

My web application will be free to download and install from gihub and very easy to use. I plan on keeping it simple so absolutley anybody will be able to use this application with no hastle or any unneccassery features to make it over complicated. This is a very simple idea for organising your appointments, so there's no need to make the application over the top.  

### Functional Requirements

* User must be able to register/create a user.
* User must be able to sign in.
* User must be informed when they have successfully been registered and signed in.
* User must be able to add any information they wish to their own lists.
* User must be able to delete items from their lists.
* User must be able to update/change items from their lists.
* Anyone should be able to view the list but not interact with it if they are not the registered user.

### Non-Functional Requirements

* The UI should be attractively styled.
* All elements of each page should be well spaced and the page should NOT look clustered.
* Everything should be well labelled and informative.
* Make use of images but not too much.
* Color should be used in each page .
* Use appropriate fonts.
* Clearly inform user about each aspect of the app to ensure they know what it's for.