"use strict";

class UserRepository {
	constructor() {
		if (new.target === UserRepository) {
			throw new TypeError("Cannot construct Abstract instances directly.");
		}
	}

	async findAll() {
		throw new Error("This method is not implemented yet.");
	}

	async findById(id) {
		throw new Error("This method is not implemented yet.");
	}

	async findByEmail(email) {
		throw new Error("This method is not implemented yet.");
	}

	async login(username, password) {
		throw new Error("This method is not implemented yet.");
	}

	async save(user) {
		throw new Error("This method is not implemented yet.");
	}
}
exports.UserRepository = UserRepository;
