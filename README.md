# Movest - a movie festival app

A software developer contractor is looking to build a team to develop an app for a short
movie festival.

Before the festival, an admin will manually collect movie files from invited participants. The
admin will then upload the movie files and add relevant movie attributes (title, etc) through
CMS, and the admin is also able to update the entry if necessary.

During the festival, everyone who installed the app can search and view the uploaded
movies. Everytime someone sees a movie, it’s counted as 1 view for the movie.

Some users can register and login to the system. These authenticated users can vote for a
movie that they like, with limitation that 1 user can only vote for the same movie once.
However, an authenticated user can vote for multiple movies that they like, and they also
can unvote a movie if they changed their mind later.

After the festival finishes, the admin can see which movies are the most popular (have the
most viewership) and which movies are the most liked (have the most votes).
They already have front-end developers, and now they approached you to help them to
create the backend side of the system.

## Basic Requirements

-   As an admin, I would be able to create and upload movies with required information related to a movies are at least title, description, duration, artists, genres, watch URL (points to the uploaded movie file)
-   As an admin, I would be able to update movie and its related information
-   As an admin, I would be able to see the most viewed movie and most viewed genre

-   As a visitor, I would be able to list all movies with pagination
-   As a visitor, I would be able to search movie by title / description / artists / genres
-   As a visitor, I would be able to track movie viewership

## Bonus Requirements

-   Vote system:

    -   As a member, I would be able to login
    -   As a member, I would be able to vote a movie
    -   As a member, I would be able to unvote a movie

    -   As a visitor, I would be able to list all of the user's voted movie

    -   As an admin, I would be able to see most voted movie and most viewed genre

-   Authentication System:

    -   As a visitor, I would be able to register
    -   As a member, I would be able to login and logout

-   As a visitor, I would be able to trace viewership based on watching duration. Note!!! in this requirement, its not clear yet about how anonymous and member rule when see the movie. So i'm assuming to make it unique, all visitor will behave the same as one member.
