"use strict";

const { BaseController } = require("./BaseController");
const passport = require("passport");

class UserController extends BaseController {
	getService = () => {
		return this.userService;
	};

	constructor(userService) {
		super();
		this.userService = userService;
	}

	registerUser = async (req, res) => {
		try {
			let userId = await this.userService.registerUser(req.body);
			return this.ok(res, userId);
		} catch (e) {
			return this.fail(res, e);
		}
	};

	loginUser = async (req, res) => {
		try {
			if (!req.body.username && !req.body.password) {
				return this.clientError(res, "Please input credentials.");
			}

			passport.authenticate("login", async (err, user, info) => {
				try {
					if (err || !user) {
						const error = new Error("An error occurred while login.");
						return this.fail(res, err || error);
					}

					req.login(user, { session: true }, async (error) => {
						if (error) return this.fail(res, error);

						return this.ok(res);
					});
				} catch (e) {
					return this.fail(res, e);
				}
			})(req, res);
		} catch (e) {
			return this.fail(res, e);
		}
	};

	logoutUser = async (req, res) => {
		try {
			req.logout();
			return this.ok(res);
		} catch (e) {
			return this.fail(res, e);
		}
	}
}
exports.UserController = UserController;
