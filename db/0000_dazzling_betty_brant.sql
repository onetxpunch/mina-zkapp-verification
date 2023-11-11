CREATE TABLE `users` (
	`id` text,
	`o1jsVersion` text NOT NULL,
	`input` text NOT NULL,
	`publicKey` text NOT NULL,
	`verificationHash` text NOT NULL,
	`created` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
