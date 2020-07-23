"use strict";

const mysql = require("mysql2/promise");

class MySQLDatabase {
	constructor(config) {
		this.config = config;
	}

	_createConnection = async () => {
		let { name, user, pass, host, port } = this.config;

		this.connection = mysql.createPool({
			database: name,
			user: user,
			password: pass,
			host: host,
			port: port,
		});
	};

	getConnection = async () => {
		if (!this.connection) {
			await this._createConnection();
		}

		return await this.connection.getConnection();
	};
}
exports.MySQLDatabase = MySQLDatabase;
