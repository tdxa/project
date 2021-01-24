# Table of Contents
1. [ About the project ](#about)
   - [ Description ](#des)
   - [Team](#team)
2. [ App preview ](#preview)
3. [ Built with ](#built)
4. [ Usage ](#usage)

<a name="about"></a>
# Node.js gallery app
<a name="des"></a>
### Description
This is a complete authentication app built with Node.js, Express, Passport, Mongoose and some other packages. It's connected to the [MongoDB](https://www.mongodb.com/2) database.

In the application, user can log in to his account and enter a personal dashborad where there is a gallery of posted photos of all users. If the user doesn't have an account, he can register a new one. The photo gallery on the dashboard allows the user to go to the subpage (by clicking on the name of the author of photo) where there are all photos added by the selected author.

From the dashboard level, the user has option to go to the subpage of adding a new photo to the app and thus to display and manage all previously added photos, i.e. user can delete them from the application. Another subpage - of the account settings allows the user to view information about their profile, change their password or delete their profile.

If an unauthenticated person wants to access a personal dashboard and subpages, the application will open the login page with error massage displayed - `You must be logged in to view this page`.


<a name="team"></a>
### Team:
Project created by the team: \
[👤 Anna Domańska](https://github.com/tdxa) \
[👤 Krzysztof Dąbrowski] (https://github.com/IamCostello)\

<a name="preview"></a>  
# App preview
<p align="center">
 <img src="https://user-images.githubusercontent.com/51888438/105636026-6dfe7580-5e66-11eb-8a51-fcce45e9472f.gif" alt="gif"/>
</p>

<a name="built"></a> 
# Built with
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com)
- [Passport.js](http://www.passportjs.org)
- [Moongoose](https://mongoosejs.com)
- [EJS](https://ejs.co)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

<a name="usage"></a> 
# Usage
To install packages
```
$ npm install
```
To run app
```
$ npm start
```
Or you can run with Nodemon
```
$ npm run dev
```

<a name="mongo"></a> 
## MongoDB
Open `config/keys.js` and replace all uppercase items with the your config from MongoDB.
