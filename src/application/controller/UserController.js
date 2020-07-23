"use strict";

const { BaseController } = require("./BaseController");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

					req.login(user, { session: false }, async (error) => {
						if (error) return this.fail(res, error);

						let tokenPayload = {
							userId: user.id,
							role: user.role,
						};

						let token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
							algorithm: "HS512",
							expiresIn: "24h",
						});

						return this.ok(res, { token: token, id: user.id });
					});
				} catch (e) {
					return this.fail(res, e);
				}
			})(req, res);
		} catch (e) {
			return this.fail(res, e);
		}
	};
}
exports.UserController = UserController;
