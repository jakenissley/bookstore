-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 13, 2018 at 03:20 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Name` varchar(30) NOT NULL,
  `Id_no` int(11) NOT NULL,
  `Phone_no` varchar(12) NOT NULL,
  `Address` varchar(256) DEFAULT NULL,
  `Username` varchar(12) DEFAULT NULL,
  `Password` varchar(12) DEFAULT NULL,
  `Created_date` datetime DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Name`, `Id_no`, `Phone_no`, `Address`, `Username`, `Password`, `Created_date`, `Email`) VALUES
('Luke Hardin', 1, '682-555-5555', '808 Someplace Park Trl.', 'lhardin491', 'luke.hardin', '2018-04-13 00:00:00', 'lhardin491@gmail.com'),
('Jake Nissley', 2, '682-666-6666', '125 Somewhere Ct.', 'jnissley', 'pass', '2018-04-13 00:00:00', 'jnissley@gmail.com'),
('Andrew Hernandez', 3, '682-777-7777', '157 Broken Dreams Blvd.', 'DreamLap', 'andrewscool', '2018-04-13 00:00:00', 'drewww7@aol.com');

-- --------------------------------------------------------

--
-- Table structure for table `customer_payments`
--

CREATE TABLE `customer_payments` (
  `Item_id` int(11) DEFAULT NULL,
  `Customer_id` int(11) DEFAULT NULL,
  `Total_price` double DEFAULT NULL,
  `Payment_type` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_payments`
--

INSERT INTO `customer_payments` (`Item_id`, `Customer_id`, `Total_price`, `Payment_type`) VALUES
(2, 2, 24.99, 'Card');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `Item_id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Publisher` varchar(30) DEFAULT NULL,
  `Type` varchar(30) DEFAULT NULL,
  `Subject` int(11) DEFAULT NULL,
  `Description` varchar(256) DEFAULT NULL,
  `Item_image` varchar(256) DEFAULT NULL,
  `No_available` int(11) NOT NULL,
  `Price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`Item_id`, `Name`, `Publisher`, `Type`, `Subject`, `Description`, `Item_image`, `No_available`, `Price`) VALUES
(1, 'The Hobbit', 'Penguin Randomhouse', 'Book', 1, 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.', 'http://www.tolkienlibrary.com/booksbytolkien/hobbit/images/book.jpg', 58, 27.58),
(2, 'Mad Max: Fury Road', 'Time Warner', 'Movie', 2, 'A woman rebels against a tyrannical ruler in postapocalyptic Australia in search for her home-land with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max. ', 'https://ia.media-imdb.com/images/M/MV5BYTY2MTlhMTItZGFiOS00ZGM5LTlhYjUtZWU4NmZmOWJmNzc0XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_CR0,0,666,1000_AL_.jpg', 75, 24);

-- --------------------------------------------------------

--
-- Table structure for table `literature_author`
--

CREATE TABLE `literature_author` (
  `Author_id` int(11) NOT NULL,
  `Author_name` varchar(30) DEFAULT NULL,
  `Item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `literature_author`
--

INSERT INTO `literature_author` (`Author_id`, `Author_name`, `Item_id`) VALUES
(1, 'J.R.R Tolkien', 1);

-- --------------------------------------------------------

--
-- Table structure for table `media_director`
--

CREATE TABLE `media_director` (
  `Director_id` int(11) NOT NULL,
  `Director_name` varchar(30) DEFAULT NULL,
  `Item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `media_director`
--

INSERT INTO `media_director` (`Director_id`, `Director_name`, `Item_id`) VALUES
(1, 'George Miller', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order_id` int(11) NOT NULL,
  `Item_id` int(11) NOT NULL,
  `Customer_id` int(11) NOT NULL,
  `Order_date` datetime NOT NULL,
  `Total_price` double NOT NULL,
  `Employee_ssn` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Order_id`, `Item_id`, `Customer_id`, `Order_date`, `Total_price`, `Employee_ssn`) VALUES
(1, 2, 2, '2018-04-13 00:00:00', 24.99, '987654321');

-- --------------------------------------------------------

--
-- Table structure for table `publisher`
--

CREATE TABLE `publisher` (
  `Name` varchar(30) NOT NULL,
  `Address` varchar(256) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `publisher`
--

INSERT INTO `publisher` (`Name`, `Address`, `Phone`) VALUES
('Penguin Randomhouse', '658 Arctic Blvd.', '8001234567'),
('Time Warner', '789 Warner Street', '8004567890');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `Name` varchar(30) DEFAULT NULL,
  `Ssn` varchar(9) NOT NULL,
  `Bdate` varchar(11) NOT NULL,
  `Address` varchar(256) NOT NULL,
  `Sex` char(1) NOT NULL,
  `Salary` int(11) NOT NULL,
  `Super_ssn` varchar(9) DEFAULT NULL,
  `Position` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`Name`, `Ssn`, `Bdate`, `Address`, `Sex`, `Salary`, `Super_ssn`, `Position`) VALUES
('Jimmy Neutron', '123456789', '06/09/1982', '123 Rocket St.', 'M', 3500, NULL, 'Supervisor'),
('Carl Sagan', '987654321', '09/10/1932', '521 Space Dr.', 'M', 3000, '123456789', 'Stocker');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `Subject_id` int(11) NOT NULL,
  `Subject_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`Subject_id`, `Subject_name`) VALUES
(1, 'Fantasy'),
(2, 'Action'),
(3, 'Mystery'),
(4, 'Romance');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Id_no`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD KEY `Item_id` (`Item_id`),
  ADD KEY `Customer_id` (`Customer_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`Item_id`),
  ADD KEY `Publisher` (`Publisher`),
  ADD KEY `Subject` (`Subject`);

--
-- Indexes for table `literature_author`
--
ALTER TABLE `literature_author`
  ADD PRIMARY KEY (`Author_id`),
  ADD KEY `Item_id` (`Item_id`);

--
-- Indexes for table `media_director`
--
ALTER TABLE `media_director`
  ADD PRIMARY KEY (`Director_id`),
  ADD KEY `Item_id` (`Item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_id`),
  ADD KEY `Item_id` (`Item_id`),
  ADD KEY `Customer_id` (`Customer_id`),
  ADD KEY `Employee_ssn` (`Employee_ssn`);

--
-- Indexes for table `publisher`
--
ALTER TABLE `publisher`
  ADD PRIMARY KEY (`Name`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`Ssn`),
  ADD KEY `Super_ssn` (`Super_ssn`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`Subject_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Id_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `Item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `literature_author`
--
ALTER TABLE `literature_author`
  MODIFY `Author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `media_director`
--
ALTER TABLE `media_director`
  MODIFY `Director_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `Subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_payments`
--
ALTER TABLE `customer_payments`
  ADD CONSTRAINT `customer_payments_ibfk_1` FOREIGN KEY (`Item_id`) REFERENCES `item` (`Item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `customer_payments_ibfk_2` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Id_no`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`Publisher`) REFERENCES `publisher` (`Name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_ibfk_2` FOREIGN KEY (`Subject`) REFERENCES `subject` (`Subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `literature_author`
--
ALTER TABLE `literature_author`
  ADD CONSTRAINT `literature_author_ibfk_1` FOREIGN KEY (`Item_id`) REFERENCES `item` (`Item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `media_director`
--
ALTER TABLE `media_director`
  ADD CONSTRAINT `media_director_ibfk_1` FOREIGN KEY (`Item_id`) REFERENCES `item` (`Item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Item_id`) REFERENCES `item` (`Item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Customer_id`) REFERENCES `customer` (`Id_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`Employee_ssn`) REFERENCES `staff` (`Ssn`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
