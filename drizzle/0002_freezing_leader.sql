ALTER TABLE `companies` ADD `logo` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `rating` varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `reviewsLink` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `reviewsCount` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `reviewsText` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `salariesLink` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `salariesCount` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `jobsLink` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `jobsCount` varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `location` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `locationLink` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `companySize` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `companyType` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `companies` ADD `description` text NOT NULL;