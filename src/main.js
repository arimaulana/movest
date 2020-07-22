"use strict";

require("dotenv").config();

const { InMemoryMovieRepository } = require("./repository/implementation/InMemoryMovieRepository");
const { MovieService } = require("./service/MovieService");
const { MovieController } = require("./application/controller/MovieController");
const { App } = require("./application/App");

const app = new App(new MovieController(new MovieService(new InMemoryMovieRepository())));
app.initApp();
app.listen(process.env.APP_PORT);
