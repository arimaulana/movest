"use strict";

class BaseController {
	jsonResponse(res, code, data) {
		res.type("application/json");

		let jsonBody = {
			message: "success",
			data: data,
		};

		if (code >= 400) {
			jsonBody = {
				message: data.toString(),
				data: undefined,
			};
		}

		return res.status(code).json(jsonBody);
	}

	ok(res, data) {
		return this.jsonResponse(res, 200, data);
	}

	created(res, data) {
		return this.jsonResponse(res, 201, data);
	}

	clientError(res, message) {
		return this.jsonResponse(res, 400, message ? message : "Unauthorized");
	}

	unauthorized(res, message) {
		return this.jsonResponse(res, 401, message ? message : "Unauthorized");
	}

	paymentRequired(res, message) {
		return this.jsonResponse(res, 402, message ? message : "Payment required");
	}

	forbidden(res, message) {
		return this.jsonResponse(res, 403, message ? message : "Forbidden");
	}

	notFound(res, message) {
		return this.jsonResponse(res, 404, message ? message : "Not found");
	}

	conflict(res, message) {
		return this.jsonResponse(res, 409, message ? message : "Conflict");
	}

	tooMany(res, message) {
		return this.jsonResponse(res, 429, message ? message : "Too many requests");
	}

	todo(res) {
		return this.jsonResponse(res, 400, "TODO");
	}

	fail(res, error) {
		return this.jsonResponse(res, 500, error.toString());
	}
}
exports.BaseController = BaseController;
