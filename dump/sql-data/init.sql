-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: movest-db:3306
-- Generation Time: Jul 24, 2020 at 12:30 AM
-- Server version: 5.7.29
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `movest`
--
CREATE DATABASE IF NOT EXISTS `movest` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `movest`;

-- --------------------------------------------------------

--
-- Table structure for table `genre_tracker`
--

DROP TABLE IF EXISTS `genre_tracker`;
CREATE TABLE IF NOT EXISTS `genre_tracker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` varchar(50) NOT NULL COMMENT 'movie id',
  `name` varchar(50) NOT NULL COMMENT 'genre name',
  PRIMARY KEY (`id`),
  KEY `fk_genreTracker_to_movies` (`movie_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COMMENT='this table is used for tracking / mapping genre with movie';

--
-- Truncate table before insert `genre_tracker`
--

TRUNCATE TABLE `genre_tracker`;
--
-- Dumping data for table `genre_tracker`
--

INSERT INTO `genre_tracker` (`id`, `movie_id`, `name`) VALUES
(1, '1595438393089', 'action'),
(2, '1595438393089', 'adventure'),
(3, '1595438393090', 'drama'),
(4, '1595438393091', 'drama'),
(5, '1595438393092', 'drama'),
(6, '1595438393093', 'drama'),
(7, '1595438393094', 'history'),
(8, '1595438393094', 'historical drama'),
(9, '1595438393094', 'historical fiction'),
(10, '1595438393094', 'action fiction'),
(11, '1595438393094', 'costume drama'),
(12, '1595438393095', 'science fiction'),
(13, '1595438393095', 'horror fiction'),
(14, '1595438393095', 'historical drama'),
(15, '1595438393096', 'action'),
(16, '1595438393096', 'adventure'),
(17, '1595438393096', 'drama'),
(18, '1595438393096', 'science fiction'),
(19, '1595438393096', 'fantasy'),
(26, '542dce19-ad4e-46f2-bb13-bb4090c55694-1595468179947', 'comedy'),
(27, '542dce19-ad4e-46f2-bb13-bb4090c55694-1595468179947', 'drama');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE IF NOT EXISTS `movies` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT 'title of the movie',
  `description` text NOT NULL COMMENT 'description of the movie',
  `duration` int(11) NOT NULL COMMENT 'duration of the movie',
  `artists` varchar(255) NOT NULL COMMENT 'artists cast',
  `watch_url` varchar(50) NOT NULL COMMENT 'movie slug',
  `total_view` int(11) DEFAULT '0' COMMENT 'Total viewer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `watch_url` (`watch_url`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncate table before insert `movies`
--

TRUNCATE TABLE `movies`;
--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `description`, `duration`, `artists`, `watch_url`, `total_view`) VALUES
('1595438393089', 'WARRIOR NUN', 'A woman regains consciousness in a morgue to discover she has powers which force her to join in on a fight against good and evil.', 60, 'Alba Baptista, Tristan Ulloa, Kristina Tonteri-Young, Lorena Andrea, Toya Turner, Thekla Reuten', 'warrior-nun', 11),
('1595438393090', 'GIRI/HAJI', 'A Tokyo detective heads to London to find his missing brother, who\'s been linked to the Yakuza and accused of murder.', 60, 'Charlie Creed-Miles, Takehiro Hira, Togo Igawa', 'giri-haji', 2),
('1595438393091', 'DARK', 'Dark is set in a German town in present day where the disappearance of two young children exposes the double lives and fractured relationships among four families.', 60, 'Louis Hofmann, Oliver Masucci, JÃ¶rdis Triebel', 'dark', 3),
('1595438393092', 'OZARK', 'A family moves into an Ozarks resort community and faces struggles in a new place filled with dirty money.', 60, 'Jason Bateman, Laura Linney, Julia Garner', 'ozark', 3),
('1595438393093', 'WHEN THEY SEE US', 'Depiction of the 1989 case involving \"The Central Park Five,\" in which five black and Latino teens were convicted of raping a Central Park jogger.\r\n', 60, 'Jovan Adepo, Reginald L. Barnes, Asante Blackk', 'when-they-see-us', 8),
('1595438393094', 'THE LAST KINGDOM', 'Anglo-Saxons are attacked by Viking forces. Uhtred, born a Saxon but raised by Vikings, finds his loyalties tested as he tries to claim his birthright and help create a new nation.\r\n', 60, 'Alexander Dreymon, Matthew MacFadyen, Rutger Hauer', 'the-last-kingdom', 25),
('1595438393095', 'STRANGER THINGS', 'Stranger Things is an American science fiction horror web television series created by the Duffer Brothers and released on Netflix.', 60, 'Winona Ryder, David Harbour, Millie Bobby Brown', 'stranger-things', 0),
('1595438393096', 'STARGIRL', 'all that changes when he meets Stargirl Caraway (Grace VanderWaal), a confident and colorful new student with a penchant for the ukulele, who stands out in a crowd.', 107, 'Grace VanderWaal, Graham Verchere, Giancarlo Esposito, Maximiliano Hernandez', 'stargirl', 7),
('542dce19-ad4e-46f2-bb13-bb4090c55694-1595468179947', 'Jojo Rabbit', 'Writer director Taika Waititi (THOR: RAGNAROK, HUNT FOR THE WILDERPEOPLE), brings his signature style of humor and pathos to his latest film, JOJO RABBIT, a World War II satire that follows a lonely German boy (Roman Griffin Davis as Jojo) whose world view is turned upside down when he discovers his single mother (Scarlett Johansson) is hiding a young Jewish girl (Thomasin McKenzie) in their attic. Aided only by his idiotic imaginary friend, Adolf Hitler (Taika Waititi), Jojo must confront his blind nationalism.', 108, 'Roman Griffin Davis, Thomasin McKenzie, Taika Waititi, Rebel Wilson, Sam Rockwell, Scarlett Johansson', 'jojo-rabbit', 31);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(255) NOT NULL COMMENT 'ID of the user',
  `username` varchar(50) NOT NULL COMMENT 'Username of the user',
  `password` varchar(50) NOT NULL COMMENT 'Password',
  `role` enum('admin','member','visitor') NOT NULL DEFAULT 'member' COMMENT 'Role of the user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='This table is used for storing data user';

--
-- Truncate table before insert `user`
--

TRUNCATE TABLE `user`;
--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`) VALUES
('wodfjwadlfkj-123jasdfasdf-30djf01jf-123123wer', 'arimaulana', '123123123', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `viewership`
--

DROP TABLE IF EXISTS `viewership`;
CREATE TABLE IF NOT EXISTS `viewership` (
  `movie_id` varchar(50) NOT NULL COMMENT 'Movie ID',
  `user_id` varchar(50) DEFAULT NULL COMMENT 'User ID',
  `duration` int(11) NOT NULL DEFAULT '0' COMMENT 'Watch duration',
  `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  KEY `fk_viewership_to_user` (`user_id`),
  KEY `fk_viewership_to_movies` (`movie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Used to collect viewership of the movie';

--
-- Truncate table before insert `viewership`
--

TRUNCATE TABLE `viewership`;
--
-- Dumping data for table `viewership`
--

INSERT INTO `viewership` (`movie_id`, `user_id`, `duration`, `last_update`) VALUES
('542dce19-ad4e-46f2-bb13-bb4090c55694-1595468179947', NULL, 25, '2020-07-23 22:40:25'),
('1595438393089', NULL, 10, '2020-07-23 22:40:25'),
('1595438393090', NULL, 5, '2020-07-23 22:40:25'),
('1595438393091', NULL, 4, '2020-07-23 22:40:25'),
('1595438393092', NULL, 3, '2020-07-23 22:40:25'),
('1595438393093', NULL, 9, '2020-07-23 22:40:25'),
('1595438393094', NULL, 4, '2020-07-23 22:40:25'),
('1595438393096', NULL, 8, '2020-07-23 22:40:25');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `genre_tracker`
--
ALTER TABLE `genre_tracker`
  ADD CONSTRAINT `fk_genreTracker_to_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

--
-- Constraints for table `viewership`
--
ALTER TABLE `viewership`
  ADD CONSTRAINT `fk_viewership_to_movies` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`),
  ADD CONSTRAINT `fk_viewership_to_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;
