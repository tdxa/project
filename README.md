# Table of Contents
1. [ About the project ](#about)
2. [ App preview ](#preview)
3. [ Built with ](#built)
4. [ Usage ](#usage)

<a name="about"></a>
# Node.js login app
This is a complete authentication app built with Node.js, Express, Passport, Mongoose and some other packages. It's connected to the [MongoDB](https://www.mongodb.com/2) database.

In the application, user can log in to his account and enter a personal dashborad. If the user doesn't have an account, he can register a new one. 
If an unauthenticated person wants to access a personal dashboard, the application will open the login page with error massage displayed - `You must be logged in to view this page`.

<a name="preview"></a>  
# App preview
<p align="center">
 <img src="https://user-images.githubusercontent.com/51888438/103378904-35c47b00-4ae4-11eb-9336-3eb3c6ec6ba3.gif" alt="gif"/>
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
