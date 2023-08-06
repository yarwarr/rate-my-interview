CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`company_id` int NOT NULL,
	`question` varchar(255) NOT NULL,
	`answer` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `interview_questions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`interview_id` int NOT NULL,
	`question_id` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `interviewees` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `interviews` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`company_id` int NOT NULL,
	`interviewee_id` int NOT NULL,
	`position_id` int NOT NULL,
	`offer_status` varchar(255) NOT NULL,
	`experience` varchar(255) NOT NULL,
	`interview_process` text NOT NULL);
--> statement-breakpoint
CREATE TABLE `positions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`company_id` int NOT NULL,
	`name` varchar(255) NOT NULL);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`text` varchar(255) NOT NULL);
