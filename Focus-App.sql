-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 14. Feb 2021 um 10:39
-- Server-Version: 5.7.26
-- PHP-Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Datenbank: `Focus-App`
--

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
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;