"use strict";

const { v4: uuidv4 } = require("uuid");
const { MovieRepository } = require("../MovieRepository");
const { Movie, MovieBuilder } = require("../../domain/Movie");

class InMemoryMovieRepository extends MovieRepository {
	movies = [
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime())
			.setTitle("Jojo Rabbit")
			.setDescription(
				"Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism."
			)
			.setDuration(108)
			.setArtists([
				"Roman Griffin Davis",
				"Thomasin McKenzie",
				"Taika Waititi",
				"Rebel Wilson",
				"Sam Rockwell",
				"Scarlett Johansson",
			])
			.setGenres(["comedy", "drama"])
			.setWatchURL("jojo-rabbit")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 20)
			.setTitle("Hulk the Incredible")
			.setDescription(
				"Mild-mannered scientist Bruce Banner has been traveling the globe in search of the antidote that will allow him to break free from his primal alter ego, but both the warmongers who long to exploit him for their own gain and a horrific creature known as The Abomination are determined to stop him from achieving his noble goal in Transporter 2 director Louis Leterrier's take on the classic Marvel Comics superhero tale. For years, Bruce (Edward Norton) has been living in the shadows, pursued by the military and haunted by the rage within. But traveling the world in secrecy isn't easy, and as hard as he tries Bruce can't get Betty Ross (Liv Tyler) off his mind. The daughter of Bruce's nemesis Gen. Thaddeus \"Thunderbolt\" Ross (William Hurt), Betty represents everything that is beautiful in the world to a man who lives his life on the run. Eventually, Bruce returns to civilization and faces the wrath of The Abomination. While the Hulk may be a formidable force of nature, The Abomination is decidedly more powerful, and determined to destroy Bruce Banner. Created when KGB agent Emil Blonsky (Tim Roth) exposed himself to a higher dose of the same radiation that transformed Bruce into The Hulk, The Abomination is unable to change back into human form and holds Bruce accountable for his frightful condition. With time fast running out for both Bruce and The Hulk, New York City is about to become the ultimate urban battle zone as two of the most powerful creatures ever to walk the earth clash in a massive, no-holds-barred fight to the finish. ~ Jason Buchanan, Rovi"
			)
			.setDuration(112)
			.setArtists([
				"Edward Norton",
				"Liv Tyler",
				"Tim Roth",
				"William Hurt",
				"Tim Blake Nelson",
				"Ty Burrell",
			])
			.setGenres(["action", "adventure", "science fiction", "fantasy"])
			.setWatchURL("hulk-the-incredible")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 30)
			.setTitle("Jojo Rabbit 2")
			.setDescription(
				"Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism."
			)
			.setDuration(108)
			.setArtists([
				"Roman Griffin Davis",
				"Thomasin McKenzie",
				"Taika Waititi",
				"Rebel Wilson",
				"Sam Rockwell",
				"Scarlett Johansson",
			])
			.setGenres(["comedy", "drama"])
			.setWatchURL("jojo-rabbit-2")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 40)
			.setTitle("Hulk the Incredible 2")
			.setDescription(
				"Mild-mannered scientist Bruce Banner has been traveling the globe in search of the antidote that will allow him to break free from his primal alter ego, but both the warmongers who long to exploit him for their own gain and a horrific creature known as The Abomination are determined to stop him from achieving his noble goal in Transporter 2 director Louis Leterrier's take on the classic Marvel Comics superhero tale. For years, Bruce (Edward Norton) has been living in the shadows, pursued by the military and haunted by the rage within. But traveling the world in secrecy isn't easy, and as hard as he tries Bruce can't get Betty Ross (Liv Tyler) off his mind. The daughter of Bruce's nemesis Gen. Thaddeus \"Thunderbolt\" Ross (William Hurt), Betty represents everything that is beautiful in the world to a man who lives his life on the run. Eventually, Bruce returns to civilization and faces the wrath of The Abomination. While the Hulk may be a formidable force of nature, The Abomination is decidedly more powerful, and determined to destroy Bruce Banner. Created when KGB agent Emil Blonsky (Tim Roth) exposed himself to a higher dose of the same radiation that transformed Bruce into The Hulk, The Abomination is unable to change back into human form and holds Bruce accountable for his frightful condition. With time fast running out for both Bruce and The Hulk, New York City is about to become the ultimate urban battle zone as two of the most powerful creatures ever to walk the earth clash in a massive, no-holds-barred fight to the finish. ~ Jason Buchanan, Rovi"
			)
			.setDuration(112)
			.setArtists([
				"Edward Norton",
				"Liv Tyler",
				"Tim Roth",
				"William Hurt",
				"Tim Blake Nelson",
				"Ty Burrell",
			])
			.setGenres(["action", "adventure", "science fiction", "fantasy"])
			.setWatchURL("hulk-the-incredible-2")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 50)
			.setTitle("Jojo Rabbit 3")
			.setDescription(
				"Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism."
			)
			.setDuration(108)
			.setArtists([
				"Roman Griffin Davis",
				"Thomasin McKenzie",
				"Taika Waititi",
				"Rebel Wilson",
				"Sam Rockwell",
				"Scarlett Johansson",
			])
			.setGenres(["comedy", "drama"])
			.setWatchURL("jojo-rabbit-3")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 60)
			.setTitle("Hulk the Incredible 3")
			.setDescription(
				"Mild-mannered scientist Bruce Banner has been traveling the globe in search of the antidote that will allow him to break free from his primal alter ego, but both the warmongers who long to exploit him for their own gain and a horrific creature known as The Abomination are determined to stop him from achieving his noble goal in Transporter 2 director Louis Leterrier's take on the classic Marvel Comics superhero tale. For years, Bruce (Edward Norton) has been living in the shadows, pursued by the military and haunted by the rage within. But traveling the world in secrecy isn't easy, and as hard as he tries Bruce can't get Betty Ross (Liv Tyler) off his mind. The daughter of Bruce's nemesis Gen. Thaddeus \"Thunderbolt\" Ross (William Hurt), Betty represents everything that is beautiful in the world to a man who lives his life on the run. Eventually, Bruce returns to civilization and faces the wrath of The Abomination. While the Hulk may be a formidable force of nature, The Abomination is decidedly more powerful, and determined to destroy Bruce Banner. Created when KGB agent Emil Blonsky (Tim Roth) exposed himself to a higher dose of the same radiation that transformed Bruce into The Hulk, The Abomination is unable to change back into human form and holds Bruce accountable for his frightful condition. With time fast running out for both Bruce and The Hulk, New York City is about to become the ultimate urban battle zone as two of the most powerful creatures ever to walk the earth clash in a massive, no-holds-barred fight to the finish. ~ Jason Buchanan, Rovi"
			)
			.setDuration(112)
			.setArtists([
				"Edward Norton",
				"Liv Tyler",
				"Tim Roth",
				"William Hurt",
				"Tim Blake Nelson",
				"Ty Burrell",
			])
			.setGenres(["action", "adventure", "science fiction", "fantasy"])
			.setWatchURL("hulk-the-incredible-3")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 70)
			.setTitle("Jojo Rabbit 4")
			.setDescription(
				"Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism."
			)
			.setDuration(108)
			.setArtists([
				"Roman Griffin Davis",
				"Thomasin McKenzie",
				"Taika Waititi",
				"Rebel Wilson",
				"Sam Rockwell",
				"Scarlett Johansson",
			])
			.setGenres(["comedy", "drama"])
			.setWatchURL("jojo-rabbit-4")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 80)
			.setTitle("Hulk the Incredible 4")
			.setDescription(
				"Mild-mannered scientist Bruce Banner has been traveling the globe in search of the antidote that will allow him to break free from his primal alter ego, but both the warmongers who long to exploit him for their own gain and a horrific creature known as The Abomination are determined to stop him from achieving his noble goal in Transporter 2 director Louis Leterrier's take on the classic Marvel Comics superhero tale. For years, Bruce (Edward Norton) has been living in the shadows, pursued by the military and haunted by the rage within. But traveling the world in secrecy isn't easy, and as hard as he tries Bruce can't get Betty Ross (Liv Tyler) off his mind. The daughter of Bruce's nemesis Gen. Thaddeus \"Thunderbolt\" Ross (William Hurt), Betty represents everything that is beautiful in the world to a man who lives his life on the run. Eventually, Bruce returns to civilization and faces the wrath of The Abomination. While the Hulk may be a formidable force of nature, The Abomination is decidedly more powerful, and determined to destroy Bruce Banner. Created when KGB agent Emil Blonsky (Tim Roth) exposed himself to a higher dose of the same radiation that transformed Bruce into The Hulk, The Abomination is unable to change back into human form and holds Bruce accountable for his frightful condition. With time fast running out for both Bruce and The Hulk, New York City is about to become the ultimate urban battle zone as two of the most powerful creatures ever to walk the earth clash in a massive, no-holds-barred fight to the finish. ~ Jason Buchanan, Rovi"
			)
			.setDuration(112)
			.setArtists([
				"Edward Norton",
				"Liv Tyler",
				"Tim Roth",
				"William Hurt",
				"Tim Blake Nelson",
				"Ty Burrell",
			])
			.setGenres(["action", "adventure", "science fiction", "fantasy"])
			.setWatchURL("hulk-the-incredible-4")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 90)
			.setTitle("Jojo Rabbit 5")
			.setDescription(
				"Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism."
			)
			.setDuration(108)
			.setArtists([
				"Roman Griffin Davis",
				"Thomasin McKenzie",
				"Taika Waititi",
				"Rebel Wilson",
				"Sam Rockwell",
				"Scarlett Johansson",
			])
			.setGenres(["comedy", "drama"])
			.setWatchURL("jojo-rabbit-5")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 100)
			.setTitle("Hulk the Incredible 5")
			.setDescription(
				"Mild-mannered scientist Bruce Banner has been traveling the globe in search of the antidote that will allow him to break free from his primal alter ego, but both the warmongers who long to exploit him for their own gain and a horrific creature known as The Abomination are determined to stop him from achieving his noble goal in Transporter 2 director Louis Leterrier's take on the classic Marvel Comics superhero tale. For years, Bruce (Edward Norton) has been living in the shadows, pursued by the military and haunted by the rage within. But traveling the world in secrecy isn't easy, and as hard as he tries Bruce can't get Betty Ross (Liv Tyler) off his mind. The daughter of Bruce's nemesis Gen. Thaddeus \"Thunderbolt\" Ross (William Hurt), Betty represents everything that is beautiful in the world to a man who lives his life on the run. Eventually, Bruce returns to civilization and faces the wrath of The Abomination. While the Hulk may be a formidable force of nature, The Abomination is decidedly more powerful, and determined to destroy Bruce Banner. Created when KGB agent Emil Blonsky (Tim Roth) exposed himself to a higher dose of the same radiation that transformed Bruce into The Hulk, The Abomination is unable to change back into human form and holds Bruce accountable for his frightful condition. With time fast running out for both Bruce and The Hulk, New York City is about to become the ultimate urban battle zone as two of the most powerful creatures ever to walk the earth clash in a massive, no-holds-barred fight to the finish. ~ Jason Buchanan, Rovi"
			)
			.setDuration(112)
			.setArtists([
				"Edward Norton",
				"Liv Tyler",
				"Tim Roth",
				"William Hurt",
				"Tim Blake Nelson",
				"Ty Burrell",
			])
			.setGenres(["action", "adventure", "science fiction", "fantasy"])
			.setWatchURL("hulk-the-incredible-5")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 110)
			.setTitle("Jojo Rabbit 6")
			.setDescription(
				"Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism."
			)
			.setDuration(108)
			.setArtists([
				"Roman Griffin Davis",
				"Thomasin McKenzie",
				"Taika Waititi",
				"Rebel Wilson",
				"Sam Rockwell",
				"Scarlett Johansson",
			])
			.setGenres(["comedy", "drama"])
			.setWatchURL("jojo-rabbit-6")
			.build(),
		new MovieBuilder()
			.setId(uuidv4() + "-" + new Date().getTime() + 120)
			.setTitle("Hulk the Incredible 6")
			.setDescription(
				"Mild-mannered scientist Bruce Banner has been traveling the globe in search of the antidote that will allow him to break free from his primal alter ego, but both the warmongers who long to exploit him for their own gain and a horrific creature known as The Abomination are determined to stop him from achieving his noble goal in Transporter 2 director Louis Leterrier's take on the classic Marvel Comics superhero tale. For years, Bruce (Edward Norton) has been living in the shadows, pursued by the military and haunted by the rage within. But traveling the world in secrecy isn't easy, and as hard as he tries Bruce can't get Betty Ross (Liv Tyler) off his mind. The daughter of Bruce's nemesis Gen. Thaddeus \"Thunderbolt\" Ross (William Hurt), Betty represents everything that is beautiful in the world to a man who lives his life on the run. Eventually, Bruce returns to civilization and faces the wrath of The Abomination. While the Hulk may be a formidable force of nature, The Abomination is decidedly more powerful, and determined to destroy Bruce Banner. Created when KGB agent Emil Blonsky (Tim Roth) exposed himself to a higher dose of the same radiation that transformed Bruce into The Hulk, The Abomination is unable to change back into human form and holds Bruce accountable for his frightful condition. With time fast running out for both Bruce and The Hulk, New York City is about to become the ultimate urban battle zone as two of the most powerful creatures ever to walk the earth clash in a massive, no-holds-barred fight to the finish. ~ Jason Buchanan, Rovi"
			)
			.setDuration(112)
			.setArtists([
				"Edward Norton",
				"Liv Tyler",
				"Tim Roth",
				"William Hurt",
				"Tim Blake Nelson",
				"Ty Burrell",
			])
			.setGenres(["action", "adventure", "science fiction", "fantasy"])
			.setWatchURL("hulk-the-incredible-6")
			.build(),
	];

	constructor() {
		super();
	}

	getById = async (id) => {
		return this.movies.find((movie) => movie.id === id);
	};

	getAll = async () => {
		return this.movies;
	};

	getPagination = async (options) => {
		return this.movies;
	};

	getByKeyword = async (keyword) => {
		return this.movies.filter((movie) => {
			if (movie.title.includes(keyword)) {
				return true;
			} else if (movie.description.includes(keyword)) {
				return true;
			}

			if (Array.isArray(movie.artists) && movie.artists.length > 0) {
				for (let artist of movie.artists) {
					if (artist.includes(keyword)) return true;
				}
			}

			if (Array.isArray(movie.genres) && movie.genres.length > 0) {
				for (let genre of movie.genres) {
					if (genre.includes(keyword)) return true;
				}
			}

			return false;
		});
	};

	save = async (movie) => {
		this.movies.push(movie);
	};

	update = async (id, movie) => {
		let oldMovieIndex = this.movies.findIndex((movie) => movie.id === id);
		if (oldMovieIndex < 0) throw new Error("Invalid movie id.");
		this.movies[oldMovieIndex] = movie;
	};
}
exports.InMemoryMovieRepository = InMemoryMovieRepository;
