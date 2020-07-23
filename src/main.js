"use strict";

require("dotenv").config();

const { InMemoryMovieRepository } = require("./repository/implementation/InMemoryMovieRepository");
const { MovieService } = require("./service/MovieService");
const { MovieController } = require("./application/controller/MovieController");
const { App } = require("./application/App");
const { MySQLMovieRepository } = require("./repository/implementation/MySQLMovieRepository");
const { MySQLDatabase } = require("./repository/implementation/MySQLDatabase");

// const movieRepository = new InMemoryMovieRepository()
const movieRepository = new MySQLMovieRepository(
	new MySQLDatabase({
		name: process.env.DB_NAME,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		host: process.env.DOCKER_DB_HOST || process.env.DB_HOST, // if using docker, should use docker hostname to get resolved ip
	})
);

const app = new App(new MovieController(new MovieService(movieRepository)));
app.initApp();
app.listen(process.env.APP_PORT);
