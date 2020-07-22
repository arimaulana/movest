"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

class App {
	constructor(movieController) {
		this.app = express();

		this.movieController = movieController;
	}

	/**
	 * used for initiate middleware, route, and handling error
	 */
	initApp() {
		// middleware
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));

		// route here
		this.app.use("/", this.getAppRouter());
		this.app.use("/movies", this.getMovieRouter());

		// handle error
		this.app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.type("application/json");
			res.json({ message: err.message });
		});
	}

	getAppRouter() {
		let router = express.Router();

		router.route("/").get((req, res) => {
			res.status(200).json({ message: "ok" });
		});

		return router;
	}

	getMovieRouter() {
		let uploadHandler = multer({
			dest: path.resolve(__dirname, "../../storages"),
		});

		let router = express.Router();

		router
			.route("/")
			.post(uploadHandler.single("movie"), this.movieController.uploadMovie)
			.get(this.movieController.getMovies);

		router
			.route("/:movieId")
			.get(this.movieController.getMovieById)
			.put(this.movieController.updateMovie);

		return router;
	}

	listen(port = 3000) {
		this.server = this.app.listen(port, () => console.log(`Server started at port ${port}`));
	}

	close() {
		this.server.close((e) => console.error(`errors happen when closing the server: ${e}`));
	}
}
exports.App = App;
