"use strict";

const { v4: uuidv4 } = require("uuid");

import { MovieBuilder } from "../domain/Movie";

export class MovieUseCase {
	constructor(movieRepository) {
		this.movieRepository = movieRepository;
	}

	/**
	 * @param {object} newMovie
	 * @param {string} newMovie.title
	 * @param {string} newMovie.description
	 * @param {string | number} newMovie.duration
	 * @param {string[]} newMovie.artists
	 * @param {string[]} newMovie.genres
	 * @param {string} newMovie.watchURL
	 */
	async uploadMovie(newMovie) {
		let { title, description, duration, artists, genres, watchURL } = newMovie;

		let movieId = `${uuidv4()}-${new Date().getTime()}`; // will be the video filename

		let movie = new MovieBuilder()
			.setId(movieId)
			.setTitle(title)
			.setDescription(description)
			.setDuration(duration)
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
	 * @param {string[]} newMovie.artists
	 * @param {string[]} newMovie.genres
	 * @param {string} newMovie.watchURL
	 */
	async updateMovie(id, newMovie) {
		let { title, description, duration, artists, genres, watchURL } = newMovie;

		let oldMovie = await this.movieRepository.getById(id);

		if (!oldMovie) throw new Error("Invalid movie id.");

		let movie = new MovieBuilder()
			.setId(id)
			.setTitle(title)
			.setDescription(description)
			.setDuration(duration)
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
