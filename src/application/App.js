"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

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

		// for verifying the token that sent by user is valid
		passport.use(
			new JwtStrategy(
				{
					// secret we used to sign out JWT
					secretOrKey: process.env.JWT_SECRET,
					// we expect the user to send the token from auth header as bearer token
					jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
					// allowed algorithm
					algorithms: ["HS512"],
				},
				async (jwtPayload, done) => {
					try {
						let userService = await this.userController.getService();
						let user = await userService.findUserById(jwtPayload.userId);
						if (!user) throw new Error("Invalid token.");

						return done(null, jwtPayload);
					} catch (e) {
						done(e);
					}
				}
			)
		);
	}

	_isAuthenticated() {
		return passport.authenticate("jwt", { session: false });
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

		router.route("/login").post(this.userController.loginUser);
		router.route("/signup").post(this.userController.registerUser);

		return router;
	}

	_getMovieRouter() {
		let uploadHandler = multer({
			dest: path.resolve(__dirname, "../../storages"),
		});

		let router = express.Router();

		router
			.route("/")
			.post(
				this._isAuthenticated(),
				uploadHandler.single("movie"),
				this.movieController.uploadMovie
			)
			.get(this.movieController.getMovies);

		router.route("/pagination").get(this.movieController.getMoviesPagination);

		router.route("/top").get(this._isAuthenticated(), this.movieController.getMostViewed);

		router
			.route("/:movieId")
			.get(this.movieController.getMovieById)
			.put(this._isAuthenticated(), this.movieController.updateMovie);

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
