CREATE TABLE `stats` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`positive_experience` varchar(20),
	`negative_experience` varchar(20),
	`neutral_experience` varchar(20),
	`applied_online` varchar(20),
	`recruiter` varchar(20),
	`employee_referral` varchar(20),
	`difficulty` varchar(20));
