"use strict";

const { v4: uuidv4 } = require("uuid");
const { UserBuilder } = require("../domain/User");

class UserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async findAllUser() {
		return this.userRepository.findAll();
	}

	async findUserById(id) {
		return this.userRepository.findById(id);
	}

	async findUserByUsername(username) {
		return this.userRepository.findByUsername(username);
	}

	async loginUser(username, password) {
		if (!username) {
			throw new Error("Please input username.");
		} else if (!password) {
			throw new Error("Please input password.");
		}

		let user = await this.userRepository.findByUsername(username);
		if (!user) throw new Error("Invalid credentials.");

		return this.userRepository.login(username, password);
	}

	async registerUser(user) {
		let { username, password, passwordconfirm } = user;

		if (!username) {
			throw new Error("Please input username.");
		} else if (username.length < 6 || username.length > 16) {
			throw new Error("Username should be between 6 and 16 character.");
		} else if (!password) {
			throw new Error("Please input password.");
		} else if (password.length < 6 || password.length > 32) {
			throw new Error("Password should be between 6 and 32 character.");
		} else if (!passwordconfirm) {
			throw new Error("Please input password confirmation.");
		} else if (password !== passwordconfirm) {
			throw new Error("Please input valid passowrd confirmation.");
		}

		let isUserExist = await this.userRepository.findByUsername(username);
		if (isUserExist) throw new Error("User already exist.");

		let userId = `${uuidv4()}-${new Date().getTime()}`;
		let newUser = new UserBuilder()
			.setId(userId)
			.setUsername(username)
			.setPassword(password)
			.setRole("member")
			.build();

		await this.userRepository.save(newUser);

		return userId;
	}
}
exports.UserService = UserService;
