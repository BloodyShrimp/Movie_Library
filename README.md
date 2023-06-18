# **Full Stack React and Node.js site**
<br>
<div style="text-align: right"><b>Szymon Werk</b></div>
<br>

## **Description**
- Dynamic movie library site built with Node.js and React.
- Back-end server with API calls and connection to a MySQL databse
- React front-end with login, profile and library page
- Passwords hashed securely and stored in the database
- JSON Web Token authorization

----------
<br>

## **Operations**
* Registering
* Login
* Account Deletion
* Profile Info
* Adding Movies/Series
* Editing Movie/Series entries
* View of your library
* Mutiple fields for entry description

----------
<br>

## **Endpoints**
* Users
    * POST `/` - Registration
    * POST `/login` - Login
    * GET `/auth` - Check if user is logged in
    * GET `/:id` - Get user by id
    * DELETE `/:id` - Delete user by id

* Movies
    * GET `/` - Get all movies
    * GET `/private/:userId` - Get movies by user and status
    * GET `/byId/:id` - Get movie by id
    * POST `/` - Add new movie
    * PATCH `/:id` - Edit movie
    * DELETE `/:id` - Delete movie

----------
<br>

## **Libraries**
* Frontend
    * Formik
    * React.js
    * React-DOM
    * React-Router-DOM
    * React-Scripts
    * Yup

* Backend
    * Bcrypt
    * Cors
    * Express.js
    * Jsonwebtoken
    * Mysql2
    * Sequelize
    * Sequelize-cli

----------
<br>

## **Starting up**

### **Database**
Start SQL server, create database named 'www_movies'. App will create database structure.
<br>
<br>

### **Server**
Go to '/server'

Install packets and start the server:
```
npm install
npm start
```

Express.js server will be enabled under address `localhost:8080`. 
<br>
<br>

### **Client**
Go to '/client'

Install packets and start the client:
```
npm install
npm start
```

React.js server will be enabled under the address `localhost:3000`. 

----------
<br>

## **Requirements**
**Node.js** environment<br>

## **Screenshots**
![Add Movie](https://github.com/BloodyShrimp/Movie_Library/assets/67617288/65ab9a9b-8fd8-4e96-8d74-97aa8142a0c8)
![Library](https://github.com/BloodyShrimp/Movie_Library/assets/67617288/b07b947f-ebaf-4f63-8def-85bacaa3a1cd)
![Login](https://github.com/BloodyShrimp/Movie_Library/assets/67617288/45d577b5-8d71-4a31-bb20-00a1a8a36443)
![User](https://github.com/BloodyShrimp/Movie_Library/assets/67617288/041d5b25-98eb-4bbd-a830-efea1ed566c1)
