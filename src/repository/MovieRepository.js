"use strict";

class MovieRepository {
	constructor() {
		if (new.target === MovieRepository) {
			throw new TypeError("Cannot construct Abstract instances directly.");
		}
	}

	async getById(id) {
		throw new Error("This method is not implemented yet.");
	}

	async getAll() {
		throw new Error("This method is not implemented yet.");
	}

	async getPagination(options) {
		throw new Error("This method is not implemented yet.");
	}

	async getByKeyword(keyword) {
		throw new Error("This method is not implemented yet.");
	}

	async getMostViewedMovieAndGenre() {
		throw new Error("This method is not implemented yet.");
	}

	async getMovieViewership(movieId) {
		throw new Error("This method is not implemented yet.");
	}

	async save(movie) {
		throw new Error("This method is not implemented yet.");
	}

	async update(id, movie) {
		throw new Error("This method is not implemented yet.");
	}
}
exports.MovieRepository = MovieRepository;
