"use strict";

const { MovieRepository } = require("../MovieRepository");
const { MovieBuilder } = require("../../domain/Movie");

function persistToDomain(rows, genres) {
	let genreMap = {};

	for (let genre of genres) {
		let dataGenre = genreMap[genre.movie_id] || [];
		dataGenre.push(genre.name);
		genreMap[genre.movie_id] = dataGenre;
	}

	let movies = rows.map((movie) => {
		let { id, title, description, duration, artists, watch_url } = movie;
		return new MovieBuilder()
			.setId(id)
			.setTitle(title)
			.setDescription(description)
			.setDuration(duration)
			.setArtists(artists.split(", "))
			.setGenres(genreMap[id])
			.setWatchURL(watch_url)
			.build();
	});

	return movies;
}

function generateQuestionMark(ids) {
	return "?, ".repeat(ids.length).substr(0, ids.length * 3 - 2);
}

class MySQLMovieRepository extends MovieRepository {
	constructor(connection) {
		super();

		this.connection = connection;
	}

	getById = async (id) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies where id = ?;`;
		let [movieRows] = await db.query(sql, [id]);

		let sqlGenre = `select * from genre_tracker where movie_id = ?;`;
		let [genreRows] = await db.query(sqlGenre, [id]);

		db.release();

		let movies = persistToDomain(movieRows, genreRows);
		return Array.isArray(movies) && movies.length > 0 ? movies[0] : null;
	};

	getAll = async () => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies;`;
		let [rows] = await db.query(sql);

		let sqlGenre = `select * from genre_tracker;`;
		let [genreRows] = await db.query(sqlGenre);

		db.release();

		return persistToDomain(rows, genreRows);
	};

	getPagination = async (options) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies;`;
		let [rows] = await db.query(sql);

		let moviesId = rows.map((movie) => movie.id);
		let sqlGenre = `select * from genre_tracker where movie_id in (${generateQuestionMark(
			moviesId
		)});`;
		let [genreRows] = await db.query(sqlGenre, moviesId);

		db.release();

		return persistToDomain(rows, genreRows);
	};

	getByKeyword = async (keyword) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies where title like ? or description like ? or artists like ? or genres like ?;`;
		let sqlbind = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`];
		let [rows] = await db.query(sql, sqlbind);

		let moviesId = rows.map((movie) => movie.id);
		let sqlGenre = `select * from genre_tracker where movie_id in (${generateQuestionMark(
			moviesId
		)});`;
		let [genreRows] = await db.query(sqlGenre, moviesId);

		db.release();

		return persistToDomain(rows, genreRows);
	};

	getMostViewedMovieAndGenre = async () => {
		let db = await this.connection.getConnection();

		let mostViewedMovieSql = `select m.* from movies m order by m.total_view desc limit 1;`;
		let mostViewedGenreSql = `select gt.name, sum(m.total_view) view_count from movies m inner join genre_tracker gt on gt.movie_id = m.id group by gt.name order by view_count desc limit 1;`;

		let [mostViewedMovieRow] = await db.query(mostViewedMovieSql);
		let movieId =
			Array.isArray(mostViewedMovieRow) && mostViewedMovieRow.length > 0
				? mostViewedMovieRow[0].id
				: 0;
		let [genreRow] = await db.query(`select * from genre_tracker where movie_id = ?`, [
			movieId,
		]);

		let [mostViewedGenreRow] = await db.query(mostViewedGenreSql);

		db.release();

		let mostViewedMovie = persistToDomain(mostViewedMovieRow, genreRow);
		let mostViewedGenre =
			Array.isArray(mostViewedGenreRow) && mostViewedGenreRow.length > 0
				? mostViewedGenreRow[0]
				: {};

		return {
			mostViewedMovie,
			mostViewedGenre,
		};
	};

	save = async (movie) => {
		let db = await this.connection.getConnection();

		let { id, title, description, duration, artists, genres, watchURL } = movie;

		let sql = `insert into movies (id, title, description, duration, artists, watch_url) values (?, ?, ?, ?, ?, ?);`;
		let sqlbind = [id, title, description, duration, artists.join(", "), watchURL];
		await db.query(sql, sqlbind);

		for (let genre of genres) {
			let sqlGenre = `insert into genre_tracker (movie_id, name) values (?, ?);`;
			await db.query(sqlGenre, [id, genre]);
		}

		db.release();

		return movie;
	};

	update = async (id, movie) => {
		let db = await this.connection.getConnection();

		let { title, description, duration, artists, genres, watchURL } = movie;

		let sql = `update movies set title = ?, description = ?, duration = ?, artists = ?, watch_url = ? where id = ?;`;
		let sqlbind = [title, description, duration, artists.join(", "), watchURL, id];
		await db.query(sql, sqlbind);

		// remove and recreate
		let removeGenre = `delete from genre_tracker where movie_id = ?;`;
		await db.query(removeGenre, [id]);

		for (let genre of genres) {
			let sqlGenre = `insert into genre_tracker (movie_id, name) values (?, ?);`;
			await db.query(sqlGenre, [id, genre]);
		}

		db.release();

		return movie;
	};
}
exports.MySQLMovieRepository = MySQLMovieRepository;
