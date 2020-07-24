"use strict";

const { MovieBuilder } = require("../domain/Movie");

class MovieService {
	constructor(movieRepository) {
		this.movieRepository = movieRepository;
	}

	/**
	 * @param {string} movieId
	 * @param {object} newMovie
	 * @param {string} newMovie.title
	 * @param {string} newMovie.description
	 * @param {string | number} newMovie.duration
	 * @param {string} newMovie.artists
	 * @param {string} newMovie.genres
	 * @param {string} newMovie.watchURL
	 */
	async uploadMovie(movieId, newMovie) {
		let { title, description, duration, artists, genres, watchURL } = newMovie;

		artists = artists.split(", ");
		genres = genres.split(", ");

		let movie = new MovieBuilder()
			.setId(movieId)
			.setTitle(title)
			.setDescription(description)
			.setDuration(parseInt(duration))
			.setArtists(artists)
			.setGenres(genres)
			.setWatchURL(watchURL || movieId)
			.setTotalView(0)
			.build();

		let watchURLExist = await this.movieRepository.getByWatchURL(movie.watchURL);
		if (watchURLExist) throw new Error("Watch URL already used, please choose another slug.");

		await this.movieRepository.save(movie);

		return movieId;
	}

	/**
	 * @param {string} id
	 * @param {object} newMovie
	 * @param {string} newMovie.title
	 * @param {string} newMovie.description
	 * @param {string | number} newMovie.duration
	 * @param {string} newMovie.artists
	 * @param {string} newMovie.genres
	 * @param {string} newMovie.watchURL
	 */
	async updateMovie(id, newMovie) {
		let { title, description, duration, artists, genres, watchURL } = newMovie;

		artists = artists.split(", ");
		genres = genres.split(", ");

		let oldMovie = await this.movieRepository.getById(id);
		if (!oldMovie) throw new Error("Invalid movie id.");

		let movie = new MovieBuilder()
			.setId(id)
			.setTitle(title)
			.setDescription(description)
			.setDuration(parseInt(duration))
			.setArtists(artists)
			.setGenres(genres)
			.setWatchURL(watchURL || movieId)
			.setTotalView(oldMovie.totalView)
			.build();

		let watchURLExist = await this.movieRepository.getByWatchURL(movie.watchURL, movieId);
		if (watchURLExist) throw new Error("Watch URL already used, please choose another slug.");

		await this.movieRepository.update(id, movie);

		return id;
	}

	async getMovieById(id) {
		return await this.movieRepository.getById(id);
	}

	/**
	 * used to track view count and add user into viewership of the movie
	 */
	async watchMovie(watchUrl, userId = null) {
		let movie = await this.movieRepository.getByWatchURL(watchUrl);
		if (!movie) throw new Error("Invalid video url.");

		let viewership = await this.movieRepository.getRowViewership(movie.id, userId);

		// start modify data here
		movie.totalView++;
		await this.movieRepository.update(movie.id, movie);

		if (!viewership) {
			await this.movieRepository.createViewership(movie.id, userId);
		}
	}

	/**
	 * used to track watch duration, should be hit repeatedly on client side as user watch movie
	 */
	async updateWatchDuration(watchUrl, userId = null, duration, timestamp) {
		let movie = await this.movieRepository.getByWatchURL(watchUrl);
		if (!movie) throw new Error("Invalid video url.");

		let viewership = await this.movieRepository.getRowViewership(movie.id, userId);
		if (!viewership) throw new Error('Invalid viewership.');

		// update watch duration
		let newTimestamp = timestamp;

		// handle tolerance update into 5 minutes (in case last update is newer)
		let diffMinutes = (timestamp - viewership.lastUpdate) / 1000 / 60;
		const FIVE_MINUTES = 5;

		if (timestamp < viewership.lastUpdate) {
			if (diffMinutes < -FIVE_MINUTES) {
				throw new Error("Failed to update watch duration.");
			}
			newTimestamp = viewership.lastUpdate;
		}

		let newDuration = viewership.duration + duration;
		await this.movieRepository.updateViewership(movie.id, userId, newDuration, newTimestamp);
	}

	/**
	 * @param {string} keyword
	 */
	async searchMovie(keyword) {
		return await this.movieRepository.getByKeyword(keyword);
	}

	async getAllMovie() {
		return await this.movieRepository.getAll();
	}

	async getMostViewed() {
		return await this.movieRepository.getMostViewedMovieAndGenre();
	}

	/**
	 * @param {object} options
	 * @param {number} options.page
	 * @param {number} options.perPage
	 */
	async getMoviePagination(options) {
		return await this.movieRepository.getPagination(options);
	}

	async getMovieViewership(movieId) {
		let movie = await this.movieRepository.getById(movieId);
		if (!movie) throw new Error("Invalid movie id.");

		return await this.movieRepository.getMovieViewership(movieId);
	}
}
exports.MovieService = MovieService;
