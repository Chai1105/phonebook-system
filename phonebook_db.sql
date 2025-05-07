-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2025 at 04:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phonebook_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `phonebook`
--

CREATE TABLE `phonebook` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `phonebook`
--

INSERT INTO `phonebook` (`id`, `name`, `phone_no`, `status`) VALUES
(9, 'chai kah hoe', '0123601995', 'Active'),
(10, 'alex', '0176599087', 'Active'),
(13, 'Alice Tan', '0123456789', 'Active'),
(14, 'Bob Lee', '01123456789', 'Inactive'),
(15, 'Charlie Lim', '0167890123', 'Active'),
(16, 'Diana Wong', '0178901234', 'Inactive'),
(17, 'Ethan Ng', '0189012345', 'Active'),
(18, 'Fiona Chua', '0190123456', 'Active'),
(19, 'George Teo', '0121234567', 'Inactive'),
(20, 'Hannah Goh', '0142345678', 'Active'),
(21, 'Ivan Chan', '0133456789', 'Inactive'),
(22, 'Jenny Lau', '0164567890', 'Active'),
(23, 'Kevin Yap', '0175678901', 'Inactive'),
(24, 'Lily Ong', '0186789012', 'Active'),
(25, 'Marcus Tan', '0197890123', 'Inactive'),
(26, 'Natalie Khoo', '0128901234', 'Active'),
(27, 'Oscar Lim', '0139012345', 'Active'),
(28, 'Pamela Yeo', '0140123456', 'Inactive'),
(29, 'Quincy Lee', '0111234567', 'Active'),
(30, 'Rachel Ng', '0122345678', 'Inactive'),
(31, 'Samuel Goh', '0163456789', 'Active'),
(32, 'Tiffany Wong', '0174567890', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phonebook`
--
ALTER TABLE `phonebook`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phonebook`
--
ALTER TABLE `phonebook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
