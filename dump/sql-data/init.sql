-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: movest-db:3306
-- Generation Time: Jul 22, 2020 at 05:32 PM
-- Server version: 5.7.29
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movest`
--
CREATE DATABASE IF NOT EXISTS `movest` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `movest`;

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
CREATE TABLE `movies` (
  `id` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT 'title of the movie',
  `description` varchar(255) NOT NULL COMMENT 'description of the movie',
  `duration` int(11) NOT NULL COMMENT 'duration of the movie',
  `artists` varchar(255) NOT NULL COMMENT 'artists cast',
  `genres` varchar(255) NOT NULL COMMENT 'genre of the movie',
  `watch_url` varchar(50) NOT NULL COMMENT 'movie slug'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncate table before insert `movies`
--

TRUNCATE TABLE `movies`;
--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `title`, `description`, `duration`, `artists`, `genres`, `watch_url`) VALUES
('1595438393089', 'WARRIOR NUN', 'A woman regains consciousness in a morgue to discover she has powers which force her to join in on a fight against good and evil.', 60, 'Alba Baptista, Tristan Ulloa, Kristina Tonteri-Young, Lorena Andrea, Toya Turner, Thekla Reuten', 'action, adventure', 'warrior-nun'),
('1595438393090', 'GIRI/HAJI', 'A Tokyo detective heads to London to find his missing brother, who\'s been linked to the Yakuza and accused of murder.', 60, 'Charlie Creed-Miles, Takehiro Hira, Togo Igawa', 'drama', 'giri-haji'),
('1595438393091', 'DARK', 'Dark is set in a German town in present day where the disappearance of two young children exposes the double lives and fractured relationships among four families.', 60, 'Louis Hofmann, Oliver Masucci, Jördis Triebel', 'drama', 'dark'),
('1595438393092', 'OZARK', 'A family moves into an Ozarks resort community and faces struggles in a new place filled with dirty money.', 60, 'Jason Bateman, Laura Linney, Julia Garner', 'drama', 'ozark'),
('1595438393093', 'WHEN THEY SEE US', 'Depiction of the 1989 case involving \"The Central Park Five,\" in which five black and Latino teens were convicted of raping a Central Park jogger.\r\n', 60, 'Jovan Adepo, Reginald L. Barnes, Asante Blackk', 'drama', 'when-they-see-us'),
('1595438393094', 'THE LAST KINGDOM', 'Anglo-Saxons are attacked by Viking forces. Uhtred, born a Saxon but raised by Vikings, finds his loyalties tested as he tries to claim his birthright and help create a new nation.\r\n', 60, 'Alexander Dreymon, Matthew MacFadyen, Rutger Hauer', 'History, Historical drama, Historical Fiction, Costume drama, Action fiction', 'the-last-kingdom'),
('1595438393095', 'STRANGER THINGS', 'Stranger Things is an American science fiction horror web television series created by the Duffer Brothers and released on Netflix.', 60, 'Winona Ryder, David Harbour, Millie Bobby Brown', 'Science Fiction, Horror fiction, Historical drama', 'stranger-things'),
('1595438393096', 'STARGIRL', 'all that changes when he meets Stargirl Caraway (Grace VanderWaal), a confident and colorful new student with a penchant for the ukulele, who stands out in a crowd.', 107, 'Grace VanderWaal, Graham Verchere, Giancarlo Esposito, Maximiliano Hernandez', 'action, adventure, drama, science fiction, fantasy', 'stargirl');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;