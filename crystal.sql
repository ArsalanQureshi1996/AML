-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2019 at 09:30 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crystal`
--

-- --------------------------------------------------------

--
-- Table structure for table `tenders`
--

CREATE TABLE `tenders` (
  `Cust_id` int(255) NOT NULL,
  `Cust_number` varchar(100) NOT NULL,
  `ntn_number` bigint(255) NOT NULL,
  `stn_number` bigint(255) NOT NULL,
  `Cust_name` varchar(300) NOT NULL,
  `salary_monthly` bigint(255) NOT NULL,
  `Savings` bigint(255) NOT NULL,
  `salary_per_anum` bigint(255) NOT NULL,
  `Bank_name` varchar(300) NOT NULL,
  `Bank_acc_number` bigint(255) NOT NULL,
  `Job_type` text NOT NULL,
  `Industry` text NOT NULL,
  `Currency` text NOT NULL,
  `Opening_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `politically_exposed_person` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tenders`
--

INSERT INTO `tenders` (`Cust_id`, `Cust_number`, `ntn_number`, `stn_number`, `Cust_name`, `salary_monthly`, `Savings`, `salary_per_anum`, `Bank_name`, `Bank_acc_number`, `Job_type`, `Industry`, `Currency`, `Opening_date`, `politically_exposed_person`) VALUES
(14, '4230198909157', 9264292642, 92642, 'Arsalan', 30000, 400000, 360000, 'js bank limited', 9264292642926422, 'IT', 'IT', 'PKR', '2019-02-04 19:00:00', 'YES'),
(19, '4230198909254', 92665, 875612, 'Muzammil Usman', 35000, 500000, 420000, 'js bank limited', 123456789, 'AUDIT', 'Insurance', 'PKR', '2019-01-24 19:00:00', 'NO'),
(23, '4230198909168', 546321, 2654134, 'Muhammad Azhar uddin', 800000, 500000, 9600000, 'JS Bank Limited', 9859562624897562, 'MARKETING', 'Insurance', 'PKR', '2015-02-04 19:00:00', 'no'),
(24, '4230198909152', 654321, 662345, 'Fawwad Rana', 15000, 50000, 180000, 'Meezan Bank Limited', 123456789123456, 'ADMIN', 'Insurance', 'PKR', '2016-02-17 19:00:00', 'no');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `email`, `password`, `role`) VALUES
(10, 'Muhammad Arsalan Ahmed', 'arsalanahmed973@gmail.com', '123', 'admin'),
(11, 'Farhan', 'farhan@gmail.com', '12345', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tenders`
--
ALTER TABLE `tenders`
  ADD PRIMARY KEY (`Cust_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tenders`
--
ALTER TABLE `tenders`
  MODIFY `Cust_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
