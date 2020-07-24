"use strict";

class Movie {
	constructor(id, title, description, duration, artists, genres, watchURL, totalView = 0) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.artists = artists;
		this.genres = genres;
		this.watchURL = watchURL;
		this.totalView = totalView;
	}
}
exports.Movie = Movie;

class MovieBuilder {
	setId(id) {
		this.id = id;
		return this;
	}

	setTitle(title) {
		this.title = title;
		return this;
	}

	setDescription(description) {
		this.description = description;
		return this;
	}

	setDuration(duration) {
		this.duration = duration;
		return this;
	}

	setArtists(artists) {
		this.artists = artists;
		return this;
	}

	setGenres(genres) {
		this.genres = genres;
		return this;
	}

	setWatchURL(watchURL) {
		this.watchURL = watchURL;
		return this;
	}

	setTotalView(totalView) {
		this.totalView = totalView;
		return this;
	}

	build() {
		return new Movie(
			this.id,
			this.title,
			this.description,
			this.duration,
			this.artists,
			this.genres,
			this.watchURL,
			this.totalView
		);
	}
}
exports.MovieBuilder = MovieBuilder;
