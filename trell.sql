-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2020 at 04:46 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trell`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `mname` varchar(100) NOT NULL,
  `mdesc` varchar(100) NOT NULL,
  `mdirection` varchar(20) NOT NULL,
  `duration` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`mname`, `mdesc`, `mdirection`, `duration`) VALUES
('tenet', 'time travel', 'akshit', '00:25:00'),
('hera pheri', 'comedy ', 'me', '01:42:00'),
('faf', 'faf', 'faf', '00:43:00'),
('spiderman', 'superhuman', 'akshit', '02:12:00');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `mname` varchar(100) NOT NULL,
  `time` time NOT NULL,
  `no_tickets` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`mname`, `time`, `no_tickets`) VALUES
('tenet', '19:26:00', 5),
('tenet', '20:35:00', 5),
('hera pheri', '20:37:00', 5),
('faf', '20:39:00', 5),
('faf', '20:40:00', 5),
('tenet', '20:43:00', 5),
('tenet', '19:43:00', 5),
('tenet', '19:49:00', 5),
('tenet', '19:50:00', 5),
('hera pheri', '19:52:00', 5),
('hera pheri', '19:52:00', 5),
('spiderman', '21:08:00', 143);

-- --------------------------------------------------------

--
-- Table structure for table `timing`
--

CREATE TABLE `timing` (
  `mname` varchar(100) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `ticket_price` int(11) NOT NULL,
  `total_ticket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `timing`
--

INSERT INTO `timing` (`mname`, `start_time`, `end_time`, `ticket_price`, `total_ticket`) VALUES
('tenet', '19:48:00', '01:54:00', 7, 333),
('hera pheri', '19:51:00', '19:51:00', 7, 333),
('spiderman', '21:08:00', '02:13:00', 48, 312);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `email` varchar(200) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `password`) VALUES
('akshit199@gmail.com', 'akshdifei'),
('a@gamil.com', '[object Promise]'),
('akshit19991024@gmail.com', '[object Promise]'),
('test@dhaud.com', '[object Promise]');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
