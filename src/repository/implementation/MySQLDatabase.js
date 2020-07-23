"use strict";

const mysql = require("mysql2/promise");

let connection = null;
class MySQLDatabase {
	constructor(config) {
		this.config = config;
	}

	_createConnection = async () => {
		let { name, user, pass, host, port } = this.config;

		connection = mysql.createPool({
			database: name,
			user: user,
			password: pass,
			host: host,
			port: port,
		});
	};

	getConnection = async () => {
		if (!connection) {
			await this._createConnection();
		}

		return await connection.getConnection();
	};
}
exports.MySQLDatabase = MySQLDatabase;
