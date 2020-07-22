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
		let {
			title,
			description,
			duration,
			artists,
			genres,
			watchURL,
		} = newMovie;

		artists = artists.split(", ");
		genres = genres.split(", ");

		let movie = new MovieBuilder()
			.setId(movieId)
			.setTitle(title)
			.setDescription(description)
			.setDuration(parseInt(duration))
			.setArtists(artists)
			.setGenres(genres)
			.setWatchURL(watchURL)
			.build();

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
		let {
			title,
			description,
			duration,
			artists,
			genres,
			watchURL,
		} = newMovie;

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
			.setWatchURL(watchURL)
			.build();

		await this.movieRepository.updateMovie(id, movie);

		return id;
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

	/**
	 * @param {object} options
	 * @param {number} options.page
	 * @param {number} options.perpage
	 * @param {number} options.sortBy field name
	 * @param {string} options.sortType it could be asc or desc
	 */
	async getMoviePagination(options) {
		return await this.movieRepository.getPagination(options);
	}
}
exports.MovieService = MovieService;
