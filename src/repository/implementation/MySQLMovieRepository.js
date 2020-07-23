"use strict";

const { MovieRepository } = require("../MovieRepository");
const { Movie, MovieBuilder } = require("../../domain/Movie");

function persistToDomain(rows) {
	let movies = rows.map((movie) => {
		let { id, title, description, duration, artists, genres, watchUrl } = movie;
		return new MovieBuilder()
			.setId(id)
			.setTitle(title)
			.setDescription(description)
			.setDuration(duration)
			.setArtists(artists.split(", "))
			.setGenres(genres.split(", "))
			.setWatchURL(watchUrl)
			.build();
	});

	return movies;
}

class MySQLMovieRepository extends MovieRepository {
	constructor(connection) {
		super();

		this.connection = connection;
	}

	getById = async (id) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies where id = ?;`;

		let [rows] = await db.query(sql, [id]);
		db.release();

		let movies = persistToDomain(rows);
		return Array.isArray(movies) && movies.length > 0 ? movies[0] : null;
	};

	getAll = async () => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies;`;

		let [rows] = await db.query(sql);
		db.release();

		return persistToDomain(rows);
	};

	getPagination = async (options) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies;`;

		let [rows] = await db.query(sql);
		db.release();

		return persistToDomain(rows);
	};

	getByKeyword = async (keyword) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies where title like ? or description like ? or artists like ? or genres like ?;`;
		let sqlbind = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`];

		let [rows] = await db.query(sql, sqlbind);
		db.release();

		return persistToDomain(rows);
	};

	save = async (movie) => {
		let db = await this.connection.getConnection();

		let { id, title, description, duration, artists, genres, watchUrl } = movie;

		let sql = `insert into movies (id, title, description, duration, artists, genres, watch_url) values (?, ?, ?, ?, ?, ?, ?);`;
		let sqlbind = [
			id,
			title,
			description,
			duration,
			artists.join(", "),
			genres.join(", "),
			watchUrl,
		];

		await db.query(sql, sqlbind);
		db.release();

		return movie;
	};

	update = async (id, movie) => {
		let db = await this.connection.getConnection();

		let { title, description, duration, artists, genres, watchUrl } = movie;

		let sql = `update movies set title = ?, description = ?, duration = ?, artists = ?, genres = ?, watch_url = ? where id = ?;`;
		let sqlbind = [
			title,
			description,
			duration,
			artists.join(", "),
			genres.join(", "),
			watchUrl,
			id,
		];

		await db.query(sql, sqlbind);
		db.release();

		return movie;
	};
}
exports.MySQLMovieRepository = MySQLMovieRepository;
