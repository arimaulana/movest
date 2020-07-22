"use strict";

const { MovieRepository } = require("../MovieRepository");

class InMemoryMovieRepository extends MovieRepository {
	movies = [];

	constructor() {
		super();
	}

	getById = async (id) => {
		return this.movies.find((movie) => movie.id === id);
	};

	getAll = async () => {
		return this.movies;
	};

	getPagination = async (options) => {
		return this.movies;
	};

	getByKeyword = async (keyword) => {
		return this.movies.filter((movie) => {
			if (movie.title.includes(keyword)) {
				return true;
			} else if (movie.description.includes(keyword)) {
				return true;
			}

			if (Array.isArray(movie.artists) && movie.artists.length > 0) {
				for (let artist of movie.artists) {
					if (artist.includes(keyword)) return true;
				}
			}

			if (Array.isArray(movie.genres) && movie.genres.length > 0) {
				for (let genre of movie.genres) {
					if (genre.includes(keyword)) return true;
				}
			}

			return false;
		});
	};

	save = async (movie) => {
		this.movies.push(movie);
	};

	update = async (id, movie) => {
		let oldMovieIndex = this.movies.findIndex((movie) => movie.id === id);
		if (oldMovieIndex < 0) throw new Error("Invalid movie id.");
		this.movies[oldMovieIndex] = movie;
	};
}
exports.InMemoryMovieRepository = InMemoryMovieRepository;
