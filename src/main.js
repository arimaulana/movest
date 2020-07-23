"use strict";

require("dotenv").config();

const { App } = require("./application/App");

const { InMemoryMovieRepository } = require("./repository/implementation/InMemoryMovieRepository");
const { MySQLDatabase } = require("./repository/implementation/MySQLDatabase");

const { MovieService } = require("./service/MovieService");
const { UserService } = require("./service/UserService");

const { MovieController } = require("./application/controller/MovieController");
const { UserController } = require("./application/controller/UserController");

const { MySQLMovieRepository } = require("./repository/implementation/MySQLMovieRepository");
const { MySQLUserRepository } = require("./repository/implementation/MySQLUserRepository");

// const movieRepository = new InMemoryMovieRepository()
const dbConnection = new MySQLDatabase({
	name: process.env.DB_NAME,
	user: process.env.DB_USER,
	pass: process.env.DB_PASS,
	host: process.env.DOCKER_DB_HOST || process.env.DB_HOST, // if using docker, should use docker hostname to get resolved ip
});
const movieRepository = new MySQLMovieRepository(dbConnection);
const userRepository = new MySQLUserRepository(dbConnection);
const movieController = new MovieController(new MovieService(movieRepository));
const userController = new UserController(new UserService(userRepository));

const app = new App(movieController, userController);
app.initApp();
app.listen(process.env.APP_PORT);
