-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Set 04, 2015 alle 13:28
-- Versione del server: 5.5.38
-- PHP Version: 5.5.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `Momocloud`
--


INSERT INTO `wines` (`wine_id`, `wine_name`, `producer_id`, `winetype_id`) VALUES
(1, 'Scuverta', 1, 1),
(2, 'Scampagna', 1, 3),
(3, 'L''ariete', 2, 1),
(4, 'Blauburgunger Reserva', 1, 1),
(5, 'Selezione d''ottobre', 2, 1);

--
-- Svuota la tabella prima dell'inserimento `wine_producers`
--


INSERT INTO `wine_producers` (`producer_id`, `producer_name`, `producer_active`, `producer_location`) VALUES
(1, 'Peter Wegelin', 1, 'Malans'),
(2, 'Valsangiacomo', 1, 'Bellinzona');

--
-- Svuota la tabella prima dell'inserimento `wine_types`
--


INSERT INTO `wine_types` (`winetype_id`, `winetype_description`) VALUES
(1, 'red'),
(2, 'white'),
(3, 'sparkling'),
(4, 'sweet');

