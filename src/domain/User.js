"use strict";

class User {
	constructor(id, username, password, role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}
}
exports.User = User;

class UserBuilder {
	setId(id) {
		this.id = id;
		return this;
	}

	setUsername(username) {
		this.username = username;
		return this;
	}

	setPassword(password) {
		this.password = password;
		return this;
	}

	setRole(role) {
		this.role = role;
		return this;
	}

	build() {
		return new User(this.id, this.username, this.password, this.role);
	}
}
exports.UserBuilder = UserBuilder;
