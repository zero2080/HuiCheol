CREATE DATABASE `node_orm`;

CREATE USER `node_orm`@'%' IDENTIFIED BY 'node_orm';

GRANT ALL PRIVILEGES ON `node_orm`.* TO `node_orm`@'%';

CREATE TABLE `user` (
    `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `google_id` VARCHAR(255) NULL UNIQUE KEY,
    `kakao_id` VARCHAR(255) NULL UNIQUE KEY,
    `created_at` DATETIME NOT NULL
);