"use strict";

const { v4: uuidv4 } = require("uuid");
const fs = require("fs-extra");
const path = require("path");
const { BaseController } = require("./BaseController");

class MovieController extends BaseController {
	constructor(movieService) {
		super();
		this.movieService = movieService;
	}

	uploadMovie = async (req, res) => {
		let fileInfo = req.file;
		let movieId = `${uuidv4()}-${new Date().getTime()}`; // will be the video filename
		let newMoviePath;

		try {
			if (!fileInfo) return this.clientError(res, "Please insert the movie.");

			let fileExt = path.extname(fileInfo.originalname);
			newMoviePath = fileInfo.destination + "/" + movieId + fileExt;
			await fs.move(fileInfo.path, newMoviePath);

			await this.movieService.uploadMovie(movieId, req.body);

			return this.ok(res, movieId);
		} catch (e) {
			if (fileInfo) {
				if (fs.existsSync(fileInfo.path)) {
					await fs.remove(fileInfo.path);
				} else if (fs.existsSync(newMoviePath)) {
					await fs.remove(newMoviePath);
				}
			}
			return this.fail(res, e);
		}
	};

	updateMovie = async (req, res) => {
		try {
			let { movieId } = req.params;
			await this.movieService.updateMovie(movieId, req.body);
			return this.ok(res, movieId);
		} catch (e) {
			return this.fail(res, e);
		}
	};

	getMovies = async (req, res) => {
		try {
			let movies = [];
			if (req.query.search) {
				movies = await this.movieService.searchMovie(req.query.search);
			} else {
				movies = await this.movieService.getAllMovie();
			}

			return this.ok(res, movies);
		} catch (e) {
			return this.fail(res, e);
		}
	};

	getMovieById = async (req, res) => {
		try {
			const movie = await this.movieService.getMovieById(req.params.movieId);

			return this.ok(res, movie);
		} catch (e) {
			return this.fail(res, e);
		}
	};

	getMostViewed = async (req, res) => {
		try {
			const mostViewed = await this.movieService.getMostViewed();

			return this.ok(res, mostViewed);
		} catch (e) {
			return this.fail(res, e);
		}
	};
}
exports.MovieController = MovieController;
