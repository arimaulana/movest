"use strict";

export class Movie {
	constructor(id, title, description, duration, artists, genres, watchURL, totalVote) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.duration = duration;
		this.artists = artists;
		this.genres = genres;
		this.watchURL = watchURL;
		this.totalVote = totalVote;
	}
}

export class MovieBuilder {
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

	setTotalVote(totalVote) {
		this.totalVote = totalVote;
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
			this.watchURL
		);
	}
}
