-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 14. Feb 2021 um 10:46
-- Server-Version: 5.7.26
-- PHP-Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Datenbank: `Focus-App`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tasklists`
--

CREATE TABLE `tasklists` (
  `listid` int(11) UNSIGNED NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `listname` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '1. active 2. deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `tasklists`
--

INSERT INTO `tasklists` (`listid`, `userid`, `listname`, `status`) VALUES
(1, 2, 'test', 1),
(2, 2, 'test2', 1),
(3, 2, 'testTest', 1),
(4, 2, 'test3', 2),
(5, 2, 'test4', 2),
(6, 2, 'Test100', 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tasks`
--

CREATE TABLE `tasks` (
  `taskid` int(11) UNSIGNED NOT NULL,
  `listid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `taskname` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT '1' COMMENT '1. active 2. deleted',
  `date` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `tasks`
--

INSERT INTO `tasks` (`taskid`, `listid`, `userid`, `taskname`, `status`, `date`) VALUES
(1, 1, 2, 'testtask', 2, NULL),
(2, 2, 2, 'Test2', 1, NULL),
(3, 2, 2, 'Task2 List2', 1, NULL),
(4, 1, 2, 'Task2 List1', 1, NULL),
(5, 3, 2, 'List3 Task 1', 1, NULL),
(6, 3, 2, 'List3 Task2', 1, NULL),
(7, 1, 2, 'Task3 List1', 1, NULL),
(8, 1, 2, 'Task4 List1', 1, NULL),
(9, 2, 2, 'Task3 List2', 1, NULL),
(10, 3, 2, 'List3 Task3', 1, NULL),
(13, 1, 2, 'Task5 List1', 1, NULL),
(15, 2, 2, 'Task4 List2', 1, NULL),
(16, 2, 2, 'Task5 List2', 1, NULL),
(19, 1, 2, 'new', 1, '02.09.2021'),
(20, 1, 2, 'new task', 1, '02.11.2021'),
(23, 1, 2, '02.08.21', 1, '02.08.2021'),
(24, 1, 2, '02.09.21', 1, '02.09.2021'),
(25, 1, 2, '02.10.21', 1, '02.10.2021'),
(26, 1, 2, '02.11.21', 1, '02.11.2021'),
(27, 1, 2, '02.12.21', 1, '02.12.2021'),
(28, 1, 2, '02.13.21', 1, '02.13.2021'),
(29, 1, 2, '02.14.21', 1, '02.14.2021');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `birthdate` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `birthdate`, `email`, `password`) VALUES
(1, 'Pasing', 'dddd', 'dddd', '11.11.1111', 'alexpasing@googlemail.com', '12345'),
(2, 'Test', 'Nutzer', 'TestNutzer', '01.01.2001', 'Test@test.de', '$2y$10$FAytJoT0U5sL3dhS3LaiFua7n.6eJAtpCov2ETb10ak6JDqwnEDjS'),
(3, 'test', 'User2', 'coolBro12345', '01.01.2001', 'test55@gmx.de', '$2y$10$DjecXHG.Zcnb75lqY798Lu1G6fiuo6/4ATKzR3HhgwCFS3BbZ342q');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `tasklists`
--
ALTER TABLE `tasklists`
  ADD PRIMARY KEY (`listid`);

--
-- Indizes für die Tabelle `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskid`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `tasklists`
--
ALTER TABLE `tasklists`
  MODIFY `listid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `tasks`
--
ALTER TABLE `tasks`
  MODIFY `taskid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;