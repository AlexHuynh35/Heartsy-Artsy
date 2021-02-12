// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
var Sequelize = require('sequelize');

const paper = require('paper')
const Tool = paper.Tool
const Path = paper.Path
const Point = paper.Point
const view = paper.view

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))
app.use(express.static('views'))

// Add Paper.JS
app.use(express.static('node_modules/paper/dist'))

// Database stuff
// setup a new database
// using database credentials set in .env
var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
  host: '0.0.0.0',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
    // Security note: the database is saved to the file `database.sqlite` on the local filesystem. It's deliberately placed in the `.data` directory
    // which doesn't get copied if someone remixes the project.
  storage: '.database.sqlite'
});

// users table and table
var User;
// authenticate with the database
sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
    // define a new table 'users'
    User = sequelize.define('users', {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });

    setup();
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

// create tables
function setup(){
  User.sync({force: false}) // We use 'force: true' in this example to drop the table users if it already exists, and create a new one. You'll most likely want to remove this setting in your own apps
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

// Route to drawing canvas
app.get("/canvas", (request, response) => {
  response.sendFile(__dirname + '/views/canvas.html')
})

app.post("/signup", (request, response) => {
  var username = request.query.username;
  var password = request.query.password;
  User.create({ username: username, password: password});
  response.sendStatus(200)
})

app.post("/login", (request, response) => {
  var username = request.query.username;
  var password = request.query.password;
  
  // find the user in the database
  User.findOne({
    where: { 
      username: username
    }
  })
  .then(function(data) {
    // check the data for debugging
    console.log(data)

    if (data) {
      // if we got something back, log the user in
      response.status(200)
      response.send({message: "Logged in Successfully!"})
    }
    else {
      // if not, don't log the user in
      response.status(200)
      response.send({message: "Logged in failed!"})
    }
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
});