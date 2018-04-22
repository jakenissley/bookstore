-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 22, 2018 at 02:05 AM
-- Server version: 5.6.34-log
-- PHP Version: 7.1.7

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
  `Created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Name`, `Id_no`, `Phone_no`, `Address`, `Username`, `Password`, `Created_date`, `Email`) VALUES
('Luke Hardin', 1, '682-555-5555', '808 Someplace Park Trl.', 'lhardin491', 'luke.hardin', '2018-04-13 00:00:00', 'lhardin491@gmail.com'),
('Jake Nissley', 2, '682-666-6666', '125 Somewhere Ct.', 'jnissley', 'pass', '2018-04-13 00:00:00', 'jnissley@gmail.com'),
('Andrew Hernandez', 3, '682-777-7777', '157 Broken Dreams Blvd.', 'DreamLap', 'andrewscool', '2018-04-13 00:00:00', 'drewww7@aol.com'),
('Jim Halpert', 4, '245-563-4567', '578 Park Way\r\nScranton, PA\r\n18503', 'bigtuna188', 'password', '2018-04-21 19:59:28', 'jim.halpert@dundermifflin.co'),
('Pam Halpert', 5, '245-563-4567', '578 Park Way Scranton, PA 18503', 'beasly259', 'cici05', '2018-04-21 20:02:15', 'pam.beasly@dundermifflin.co'),
('Dwight Schrute', 6, '', '1 Schrute Farms Dr.\r\nScranton, PA\r\n18503', 'beetmaster05', 'moes25', '2018-04-21 20:05:10', 'dwight.schrute@dundermifflin.co'),
('Michael Scott', 7, '456-454-5456', '15 Twisted Dr.\r\nScranton, PA\r\n18503', 'improvmaster', 'passw0rd', '2018-04-21 20:06:48', 'michael.scot@dundermifflin.co'),
('Kevin Malone', 8, '159-654-1561', '654 Park Row\r\nScranton, PA\r\n18503', 'malone24', 'snickerdood', '2018-04-21 20:08:07', 'kevin.malone@dundermifflin.co'),
('Oscar Martinez', 9, '546-564-4890', '852 Main St\r\nScranton, PA\r\n18503', 'oscar_m', 'robert23', '2018-04-21 20:09:50', 'oscar.martinez@dundermifflin.co'),
('Angela Martin', 10, '852-753-9514', '234 Methodist Way\r\nScranton, PA\r\n18503', 'sprinkles2', 'catlady', '2018-04-21 20:11:38', 'angela.martin@dundermifflin.co'),
('Stanley Hudson', 11, '456-832-459', '456 Somderville Place Dr\r\nScranton, PA\r\n18503', 'stanley_h', 'pretzelday', '2018-04-21 20:13:02', 'stanley.hudson@dundermifflin.co'),
('Creed Bratton', 12, '446-850-2000', 'NA', 'thecreed', 'password', '2018-04-21 20:14:55', 'creed.bratton@dundermifflin.co'),
('Meridith Palmer', 13, '223-555-5598', '589 Browing Street\r\nScranton, PA\r\n18503', 'meridith_p', 'password', '2018-04-21 20:16:06', 'meridith.palmer@dundermifflin.co'),
('Ryan Howard', 14, '555-996-8260', '645 Dover Street Dr.\r\nScranton, PA\r\n18503', 'Ryan_h', 'wuph23', '2018-04-21 20:17:36', 'ryan.howard@dundermifflin.co'),
('Toby Flenderson', 15, '569-456-1564', '309 Placeville Ct.\r\nScranton, PA\r\n18503', 'toby_f', 'password', '2018-04-21 20:18:32', 'toby.flenderson@dundermifflin.co'),
('Kelly Kapoor', 16, '456-454-4444', '148 Glamour Drive\r\nScranton, PA\r\n18503', 'kelleeee', 'password', '2018-04-21 20:20:18', 'kelly.kapoor@dundermifflin.co'),
('Erin Hannon', 17, '444-555-6666', '312 Park Drive Road\r\nScranton, PA\r\n18503', 'erin_h', 'password', '2018-04-21 20:21:52', 'erin.hannon@dundermifflin.co'),
('Gabe Lewis', 18, '999-556-6632', '132 Penny Lane\r\nScranton, PA\r\n18503', 'gabe_l', 'theshining', '2018-04-21 20:22:38', 'gabe.lewis@sabre.co'),
('Andy Bernard', 19, '645-165-1895', '156 Cornell St.\r\nScranton, PA\r\n18503', 'bonerchamp', 'cornell', '2018-04-21 20:23:09', 'andy.bernard@dundermifflin.co'),
('Phyllis Vance', 20, '236-275-7845', '651 Elm Street Blvd.\r\nScranton, PA\r\n18503', 'pyllis_v', 'vancerefridg', '2018-04-21 20:26:24', 'phyllis.vance@dundermifflin.co');

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
  `Name` text NOT NULL,
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
(2, 'Mad Max: Fury Road', 'Time Warner', 'Movie', 2, 'A woman rebels against a tyrannical ruler in postapocalyptic Australia in search for her home-land with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max. ', 'https://ia.media-imdb.com/images/M/MV5BYTY2MTlhMTItZGFiOS00ZGM5LTlhYjUtZWU4NmZmOWJmNzc0XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_CR0,0,666,1000_AL_.jpg', 75, 24),
(3, 'The Fellowship of the Ring', 'Allen & Unwin', 'Book', 1, 'When the eccentric hobbit Bilbo Baggins leaves his home in the Shire, he gives his greatest treasure to his heir Frodo: a magic ring that makes its wearer invisible.', 'https://upload.wikimedia.org/wikipedia/en/8/8e/The_Fellowship_of_the_Ring_cover.gif', 156, 28),
(4, 'The Two Towers', 'Allen & Unwin', 'Book', 1, 'The second half of The Two Towers rejoins Frodo and Sam just after they separate from the rest of the Fellowship and begin making their way to Mordor to destroy the Ring. As they travel, they meet the creature Gollum, whom they tame and force to be their g', 'https://upload.wikimedia.org/wikipedia/en/a/a1/The_Two_Towers_cover.gif', 29, 27.75),
(5, 'The Return of The King', 'Allen & Unwin', 'Book', 1, 'The Return of the King, the third and final volume in The Lord of the Rings, opens as Gandalf and Pippin ride east to the city of Minas Tirith in Gondor, just after parting with King Théoden and the Riders of Rohan at the end of The Two Towers.', 'https://upload.wikimedia.org/wikipedia/en/1/11/The_Return_of_the_King_cover.gif', 76, 27.36),
(6, 'Harry Potter and the Sorcerer\'s Stone', 'Scholastic Corporation', 'Book', 1, 'But not everything is quiet at Hogwarts as Harry suspects someone is planning to steal the sorcerer\'s stone. On his eleventh birthday, Harry Potter discovers that he is no ordinary boy. Hagrid, a beetle-eyed giant, tells Harry that he is a wizard and has a', 'https://upload.wikimedia.org/wikipedia/en/b/bf/Harry_Potter_and_the_Sorcerer%27s_Stone.jpg', 78, 25),
(7, 'Harry Potter and the Chamber of Secrets', 'Scholastic Corporation', 'Book', 1, 'On Harry Potter\'s birthday in 1992, the Dursley family—Harry\'s Uncle Vernon, Aunt Petunia, and cousin Dudley—hold a dinner party for a potential client of Vernon\'s drill-manufacturing company. Harry is not invited, but is content to spend the evening quiet', 'https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg', 60, 25),
(8, 'Harry Potter and the Prisoner of Azkaban', 'Scholastic Corporation', 'Book', 1, 'Harry is back at the Dursleys for the summer holidays, where he sees on Muggle television that a convict named Sirius Black has escaped, though with no mention of what facility he has broken out of. Harry involuntarily inflates Aunt Marge when she comes to', 'https://images-na.ssl-images-amazon.com/images/I/81lAPl9Fl0L.jpg', 46, 25),
(9, 'Harry Potter and the Goblet of Fire', 'Scholastic Corporation', 'Book', 1, 'Throughout the three previous novels in the Harry Potter series, the main character, Harry Potter, has struggled with the difficulties of growing up, and the added challenge of being a famed wizard: when Harry was a baby, Lord Voldemort, the most powerful ', 'https://images.gr-assets.com/books/1361482611l/6.jpg', 48, 25),
(10, 'Harry Potter and the Order of the Phoenix', 'Scholastic Corporation', 'Book', 1, 'During another summer with his Aunt Petunia and Uncle Vernon, Harry Potter and Dudley are attacked by Dementors. After using magic to save Dudley and himself, Harry is expelled from Hogwarts, but the decision is later reversed after a hearing at the Minist', 'https://images.gr-assets.com/books/1507396732l/2.jpg', 15, 25),
(11, 'Harry Potter and the Half-Blood Prince', 'Scholastic Corporation', 'Book', 1, 'Severus Snape, a member of the Order of the Phoenix, meets with Narcissa Malfoy, Draco\'s mother, and her sister Bellatrix Lestrange, Lord Voldemort\'s faithful supporter. Narcissa expresses her extreme concern that her son might not survive a dangerous miss', 'https://images.gr-assets.com/books/1361039191l/1.jpg', 31, 25),
(12, 'Harry Potter and the Half-Blood Prince', 'Scholastic Corporation', 'Book', 1, 'Throughout the six previous novels in the series, the titular character Harry Potter has struggled with the difficulties of adolescence along with being famous as the only wizard to survive the Killing Curse. The curse was cast by the evil Tom Riddle, bett', 'https://images.gr-assets.com/books/1474171184l/136251.jpg', 45, 25),
(13, 'The Matrix', 'Time Warner', 'Movie', 2, 'Neo (Keanu Reeves) believes that Morpheus (Laurence Fishburne), an elusive figure considered to be the most dangerous man alive, can answer his question -- What is the Matrix? Neo is contacted by Trinity (Carrie-Anne Moss), a beautiful stranger who leads h', 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg', 23, 19.99),
(14, 'Star Wars: Episode IV - A New Hope', 'Lucasfilm Ltd.', 'Movie', 5, 'The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain', 'http://t3.gstatic.com/images?q=tbn:ANd9GcTqRzbG-zvWPx5khd-1D9st1B7FYEq71Gbd2UdaPnrWPwVvY2PX', 54, 22.95),
(15, 'Star Wars: Episode I – The Phantom Menace', 'Lucasfilm Ltd.', 'Movie', 5, 'Obi-Wan Kenobi (Ewan McGregor) is a young apprentice Jedi knight under the tutelage of Qui-Gon Jinn (Liam Neeson) ; Anakin Skywalker (Jake Lloyd), who will later father Luke Skywalker and become known as Darth Vader, is just a 9-year-old boy. When the Trad', 'http://t0.gstatic.com/images?q=tbn:ANd9GcSb2JIB-OTEmF4VxKWNaXzWi8QwxhMTIG4YsqgnyTrfl1WfEqvy', 1, 18.96),
(16, 'Star Wars: Episode II – Attack of the Clones', 'Lucasfilm Ltd.', 'Movie', 5, 'Set ten years after the events of \"The Phantom Menace,\" the Republic continues to be mired in strife and chaos. A separatist movement encompassing hundreds of planets and powerful corporate alliances poses new threats to the galaxy that even the Jedi canno', 'http://t3.gstatic.com/images?q=tbn:ANd9GcS_urKXRdNkSND8mvflceI4Lxbn5uUd7xJyydZFXitXstRe03h7', 0, 17.99),
(17, 'Star Wars: Episode III – Revenge of the Sith', 'Lucasfilm Ltd.', 'Movie', 5, 'It has been three years since the Clone Wars began. Jedi Master Obi-Wan Kenobi (Ewan McGregor) and Jedi Knight Anakin Skywalker (Hayden Christensen) rescue Chancellor Palpatine (Ian McDiarmid) from General Grievous, the commander of the droid armies, but G', 'http://t0.gstatic.com/images?q=tbn:ANd9GcT7TlfhiJ93841oYulGpyJZ3YULcgzah1CGumaVQuZ3-zXarfai', 71, 21.25),
(18, 'Star Wars: Episode V – The Empire Strikes Back', 'Lucasfilm Ltd.', 'Movie', 5, 'The adventure continues in this \"Star Wars\" sequel. Luke Skywalker (Mark Hamill), Han Solo (Harrison Ford), Princess Leia (Carrie Fisher) and Chewbacca (Peter Mayhew) face attack by the Imperial forces and its AT-AT walkers on the ice planet Hoth. While Ha', 'http://t1.gstatic.com/images?q=tbn:ANd9GcTtXwQAEDxEY3E9Nn78H96VZCjlV6hZWPlDd5IpVNyeuzO2vT17', 88, 25.73),
(19, 'Star Wars: Episode VI – Return of the Jedi', 'Lucasfilm Ltd.', 'Movie', 5, 'Luke Skywalker (Mark Hamill) battles horrible Jabba the Hut and cruel Darth Vader to save his comrades in the Rebel Alliance and triumph over the Galactic Empire. Han Solo (Harrison Ford) and Princess Leia (Carrie Fisher) reaffirm their love and team with ', 'http://t0.gstatic.com/images?q=tbn:ANd9GcRnTSmH4ckpqTGuLeBlI6DEnAagQq1Oha9c8fDlm2SRbcpEKZK0', 68, 25),
(20, 'Lego Club Magazine', 'Scholastic Corporation', 'Periodical', 1, 'Lego Club Magazine was the official magazine for Lego, or, more specifically, the Lego Club. It features many things such as prices of Lego products, special offers, comics, games, contests, modeling tips, and more.', 'http://contentmarketinginstitute.com/wp-content/uploads/2011/01/lego-ninjago-magazine.jpg', 155, 2.99);

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
(1, 'J.R.R Tolkien', 1),
(2, 'J.R.R Tolkien', 3),
(3, 'J.R.R Tolkien', 4),
(4, 'J.R.R Tolkien', 5),
(5, 'J.K Rowling', 6),
(6, 'J.K Rowling', 7),
(7, 'J.K Rowling', 8),
(8, 'J.K. Rowling', 9),
(9, 'J.K. Rowling', 10),
(10, 'J.K. Rowling', 11),
(11, 'J.K. Rowling', 12),
(12, 'The Lego Group', 20);

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
(1, 'George Miller', 2),
(2, 'Lana Wachowski', 13),
(3, 'George Lucas', 14),
(4, 'George Lucas', 15),
(5, 'George Lucas', 16),
(6, 'George Lucas', 17),
(7, 'George Lucas', 18),
(8, 'George Lucas', 19);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order_id` int(11) NOT NULL,
  `Item_id` int(11) NOT NULL,
  `Customer_id` int(11) NOT NULL,
  `Order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Total_price` double NOT NULL,
  `Employee_ssn` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Order_id`, `Item_id`, `Customer_id`, `Order_date`, `Total_price`, `Employee_ssn`) VALUES
(1, 2, 2, '2018-04-13 00:00:00', 24.99, '987654321'),
(2, 14, 4, '2018-04-21 21:03:13', 22.95, '123456789'),
(3, 11, 16, '2018-04-21 21:03:18', 25, '987654321'),
(4, 7, 11, '2018-04-21 21:04:05', 25, '123456789'),
(5, 20, 1, '2018-04-21 21:04:15', 2.99, '123456789'),
(6, 14, 14, '2018-04-21 21:04:34', 22.95, '123456789'),
(7, 15, 1, '2018-04-21 21:04:47', 18.96, '123456789'),
(8, 17, 1, '2018-04-21 21:04:53', 21.25, '123456789'),
(9, 18, 1, '2018-04-21 21:05:03', 25.73, '123456789'),
(10, 19, 1, '2018-04-21 21:05:08', 25, '123456789');

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
('Allen & Unwin', '83 Alexander St, Crows Nest', '6128425010'),
('Lucasfilm Ltd.', '1110 Gorgas Ave, San Francisco, CA 94129', '4156231000'),
('Penguin Randomhouse', '658 Arctic Blvd.', '8001234567'),
('Scholastic Corporation', '557 Broadway, New York City, New York 10012', '8007246527'),
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
(4, 'Romance'),
(5, 'Science Fiction');

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
  MODIFY `Id_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `Item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `literature_author`
--
ALTER TABLE `literature_author`
  MODIFY `Author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `media_director`
--
ALTER TABLE `media_director`
  MODIFY `Director_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `Subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
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
