"use strict";

const { MovieRepository } = require("../MovieRepository");
const { MovieBuilder } = require("../../domain/Movie");

function persistToDomain(rows, genres = []) {
	let genreMap = {};

	for (let genre of genres) {
		let dataGenre = genreMap[genre.movie_id] || [];
		dataGenre.push(genre.name);
		genreMap[genre.movie_id] = dataGenre;
	}

	let movies = rows.map((movie) => {
		let { id, title, description, duration, artists, watch_url, total_view } = movie;
		return new MovieBuilder()
			.setId(id)
			.setTitle(title)
			.setDescription(description)
			.setDuration(duration)
			.setArtists(artists.split(", "))
			.setGenres(genreMap[id])
			.setWatchURL(watch_url)
			.setTotalView(total_view)
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

	/**
	 * @param {string} watchURL
	 * @param {string} [id] (optional) if exist, it means find all row except row with movie_id
	 */
	getByWatchURL = async (watchURL, id) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies where watch_url = ?`;
		let sqlbind = [watchURL];

		if (id) {
			sql += ' and movie_id != ?';
			sqlbind.push(id);
		}

		let [movieRows] = await db.query(sql, sqlbind);

		let moviesId = movieRows.map((movie) => movie.id);
		let sqlGenre = `select * from genre_tracker where movie_id in (${generateQuestionMark(moviesId)});`;
		let [genreRows] = await db.query(sqlGenre, moviesId);

		db.release();

		let movies = persistToDomain(movieRows, genreRows);
		return Array.isArray(movies) && movies.length > 0 ? movies[0] : null;
	}

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
		let { page = 1, perPage = 10 } = options;

		let db = await this.connection.getConnection();

		const offset = (page - 1) * perPage;

		let sql = `select * from movies limit ? offset ?;`;
		let [rows] = await db.query(sql, [perPage, offset]);

		let moviesId = rows.map((movie) => movie.id);
		let sqlGenre = `select * from genre_tracker where movie_id in (${generateQuestionMark(moviesId)});`;
		let [genreRows] = await db.query(sqlGenre, moviesId);

		let sqlCount = `select count(id) total from movies;`;
		let [totalRows] = await db.query(sqlCount);

		db.release();

		let total = Array.isArray(totalRows) && totalRows.length > 0 ? totalRows[0].total : 0;

		let paginationData = {
			totalData: total,
			totalPage: Math.ceil(total / perPage),
			page: page,
			perPage: perPage,
			data: persistToDomain(rows, genreRows),
		};

		return paginationData;
	};

	getByKeyword = async (keyword) => {
		let db = await this.connection.getConnection();

		let sql = `select * from movies where title like ? or description like ? or artists like ? or genres like ?;`;
		let sqlbind = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`];
		let [rows] = await db.query(sql, sqlbind);

		let moviesId = rows.map((movie) => movie.id);
		let sqlGenre = `select * from genre_tracker where movie_id in (${generateQuestionMark(moviesId)});`;
		let [genreRows] = await db.query(sqlGenre, moviesId);

		db.release();

		return persistToDomain(rows, genreRows);
	};

	getMostViewedMovieAndGenre = async () => {
		let db = await this.connection.getConnection();

		let mostViewedMovieSql = `select m.* from movies m order by m.total_view desc limit 1;`;
		let mostViewedGenreSql = `select gt.name, sum(m.total_view) view_count from movies m inner join genre_tracker gt on gt.movie_id = m.id group by gt.name order by view_count desc limit 1;`;

		let [mostViewedMovieRow] = await db.query(mostViewedMovieSql);
		let movieId = Array.isArray(mostViewedMovieRow) && mostViewedMovieRow.length > 0 ? mostViewedMovieRow[0].id : 0;
		let [genreRow] = await db.query(`select * from genre_tracker where movie_id = ?`, [movieId]);

		let [mostViewedGenreRow] = await db.query(mostViewedGenreSql);

		db.release();

		let mostViewedMovie = persistToDomain(mostViewedMovieRow, genreRow);
		let mostViewedGenre = Array.isArray(mostViewedGenreRow) && mostViewedGenreRow.length > 0 ? mostViewedGenreRow[0] : {};

		return {
			mostViewedMovie,
			mostViewedGenre,
		};
	};

	createViewership = async (movieId, userId = null) => {
		let db = await this.connection.getConnection();

		let sql = `insert into viewership (movie_id, user_id, duration, last_update) values (?, ?, ?, ?);`;
		let sqlbind = [movieId, userId, 0, new Date()];

		await db.query(sql, sqlbind);

		db.release();
	}

	updateViewership = async (movieId, userId = null, duration, timestamp) => {
		let db = await this.connection.getConnection();

		let userCond = userId ? 'user_id = ?' : 'user_id is ?';

		let sql = `update viewership set duration = ?, last_update = ? where movie_id = ? and ${userCond};`;
		await db.query(sql, [duration, timestamp, movieId, userId]);

		db.release();
	}

	getRowViewership = async (movieId, userId) => {
		let db = await this.connection.getConnection();

		let userCond = userId ? 'user_id = ?' : 'user_id is ?';

		let sql = `select v.movie_id movieId, v.user_id userId, v.duration, v.last_update lastUpdate from viewership v where movie_id = ? and ${userCond};`;
		let [rows] = await db.query(sql, [movieId, userId]);

		db.release();

		return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
	}

	getMovieViewership = async (movieId) => {
		let db = await this.connection.getConnection();

		let sql = `select v.user_id userId from viewership v where movie_id = ?;`;
		let [viewership] = await db.query(sql, [movieId]);

		db.release();

		return viewership.map(viewer => viewer.userId || "anonymous");
	}

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

		let { title, description, duration, artists, genres, watchURL, totalView } = movie;

		let sql = `update movies set title = ?, description = ?, duration = ?, artists = ?, watch_url = ?, total_view = ? where id = ?;`;
		let sqlbind = [title, description, duration, artists.join(", "), watchURL, totalView, id];
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
