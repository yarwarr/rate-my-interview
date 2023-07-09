-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE UNIQUE INDEX `name` ON `companies` (`name`);
*/