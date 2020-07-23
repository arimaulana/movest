"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const session = require("express-session");

class App {
	constructor(movieController, userController) {
		this.app = express();

		this.movieController = movieController;
		this.userController = userController;
	}

	/**
	 * used for initiate middleware, route, and handling error
	 */
	initApp() {
		// middleware
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this._usePassportMiddleware();

		// route here
		this.app.use("/", this._getAppRouter());
		this.app.use("/auth", this._getUserRouter());
		this.app.use("/movies", this._getMovieRouter());

		// handle error
		this.app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.type("application/json");
			res.json({ message: err.message });
		});
	}

	_usePassportMiddleware() {
		this.app.use(session({
			name: 'movest',
			secret: process.env.SECRET_KEY,
			saveUninitialized: false,
			resave: true,
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());

		// for login handler
		passport.use(
			"login",
			new LocalStrategy(
				{
					usernameField: "username",
					passwordField: "password",
				},
				async (username, password, done) => {
					try {
						let userService = await this.userController.getService();
						let user = await userService.loginUser(username, password);

						return done(null, user, { message: "Logged in successfully." });
					} catch (e) {
						return done(e);
					}
				}
			)
		);

		passport.serializeUser((user, done) => {
			let sessionUser = { id: user.id, role: user.role };
			done(null, sessionUser);
		});

		passport.deserializeUser(async (sessionUser, done) => {
			done(null, sessionUser); // straight return whats inside the session (see serializeUser)
		});
	}

	_isAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			return next(new Error('Unauthorized'))
		}
	}

	_getAppRouter() {
		let router = express.Router();

		router.route("/").get((req, res) => {
			res.status(200).json({ message: "ok" });
		});

		return router;
	}

	_getUserRouter() {
		let router = express.Router();

		router.route("/login")
			.post(this.userController.loginUser);

		router.route("/signup")
			.post(this.userController.registerUser);

		router.route('/logout')
			.post(this.userController.logoutUser);

		return router;
	}

	_getMovieRouter() {
		let uploadHandler = multer({
			dest: path.resolve(__dirname, "../../storages"),
		});

		let router = express.Router();

		router.route("/")
			.post(this._isAuthenticated, uploadHandler.single("movie"), this.movieController.uploadMovie)
			.get(this.movieController.getMovies);

		router.route("/pagination")
			.get(this.movieController.getMoviesPagination);

		router.route("/top")
			.get(this._isAuthenticated, this.movieController.getMostViewed);

		router.route("/:movieId")
			.get(this.movieController.getMovieById)
			.put(this._isAuthenticated, this.movieController.updateMovie);

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
