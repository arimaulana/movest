"use strict";

const { UserBuilder } = require("../../domain/User");
const { UserRepository } = require("../UserRepository");

function persistToDomain(rows) {
	let users = rows.map((user) => {
		let { id, username, password, role } = user;
		return new UserBuilder()
			.setId(id)
			.setUsername(username)
			.setPassword(password)
			.setRole(role)
			.build();
	});

	return users;
}

class MySQLUserRepository extends UserRepository {
	constructor(connection) {
		super();

		this.connection = connection;
	}

	async findAll() {
		let db = await this.connection.getConnection();

		let sql = `select * from user;`;
		let [rows] = await db.query(sql);

		db.release();

		return persistToDomain(rows);
	}

	async findById(id) {
		let db = await this.connection.getConnection();

		let sql = `select * from user where id = ?;`;
		let [rows] = await db.query(sql, [id]);

		db.release();

		let users = persistToDomain(rows);
		return Array.isArray(users) && users.length > 0 ? users[0] : null;
	}

	async findByUsername(username) {
		let db = await this.connection.getConnection();

		let sql = `select * from user where username = ?;`;
		let [rows] = await db.query(sql, [username]);

		db.release();

		let users = persistToDomain(rows);
		return Array.isArray(users) && users.length > 0 ? users[0] : null;
	}

	async login(username, password) {
		let db = await this.connection.getConnection();

		let sql = `select * from user where username = ? and password = ?;`;
		let [rows] = await db.query(sql, [username, password]);

		db.release();

		let users = persistToDomain(rows);
		return Array.isArray(users) && users.length > 0 ? users[0] : null;
	}

	async save(user) {
		let db = await this.connection.getConnection();

		let { id, username, password, role } = user;

		let sql = `insert into user (id, username, password, role) values (?, ?, ?, ?);`;
		await db.query(sql, [id, username, password, role]);

		db.release();

		return user;
	}
}
exports.MySQLUserRepository = MySQLUserRepository;
