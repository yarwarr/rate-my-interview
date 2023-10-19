import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, varchar, int, text, timestamp, unique, mysqlEnum } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const accounts = mysqlTable("accounts", {
	userId: varchar("userId", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	refreshTokenExpiresIn: int("refresh_token_expires_in"),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const chats = mysqlTable("chats", {
	id: int("id").autoincrement().notNull(),
	companyId: int("company_id"),
	pdfName: text("pdf_name").notNull(),
	pdfUrl: text("pdf_url").notNull(),
	userId: varchar("user_id", { length: 191 }).notNull(),
	fileKey: text("file_key").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		chatsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const companies = mysqlTable("companies", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	logo: varchar("logo", { length: 255 }).notNull(),
	rating: varchar("rating", { length: 3 }).notNull(),
	reviewsLink: varchar("reviewsLink", { length: 255 }).notNull(),
	reviewsCount: varchar("reviewsCount", { length: 10 }).notNull(),
	reviewsText: varchar("reviewsText", { length: 255 }).notNull(),
	salariesLink: varchar("salariesLink", { length: 255 }).notNull(),
	salariesCount: varchar("salariesCount", { length: 10 }).notNull(),
	jobsLink: varchar("jobsLink", { length: 255 }).notNull(),
	jobsCount: varchar("jobsCount", { length: 10 }).notNull(),
	location: varchar("location", { length: 255 }).notNull(),
	locationLink: varchar("locationLink", { length: 255 }).notNull(),
	companySize: varchar("companySize", { length: 255 }).notNull(),
	companyType: varchar("companyType", { length: 255 }).notNull(),
	description: text("description").notNull(),
	pdfUrl: text("pdf_url"),
	storedPinecone: int("storedPinecone").default(0).notNull(),
},
(table) => {
	return {
		companiesProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
		name: unique("name").on(table.name),
	}
});

export const faqs = mysqlTable("faqs", {
	id: int("id").autoincrement().notNull(),
	companyId: int("company_id").notNull(),
	question: varchar("question", { length: 255 }).notNull(),
	answer: text("answer").notNull(),
},
(table) => {
	return {
		faqsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const interviewQuestions = mysqlTable("interview_questions", {
	id: int("id").autoincrement().notNull(),
	interviewId: int("interview_id").notNull(),
	questionId: int("question_id").notNull(),
},
(table) => {
	return {
		interviewQuestionsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const interviewees = mysqlTable("interviewees", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		intervieweesProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const interviews = mysqlTable("interviews", {
	id: int("id").autoincrement().notNull(),
	companyId: int("company_id").notNull(),
	intervieweeId: int("interviewee_id").notNull(),
	positionId: int("position_id").notNull(),
	offerStatus: varchar("offer_status", { length: 255 }).notNull(),
	experience: varchar("experience", { length: 255 }).notNull(),
	interviewProcess: text("interview_process").notNull(),
	difficulty: varchar("difficulty", { length: 255 }).notNull(),
},
(table) => {
	return {
		interviewsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const messages = mysqlTable("messages", {
	id: int("id").autoincrement().notNull(),
	chatId: int("chat_id").notNull(),
	content: text("content").notNull(),
	role: mysqlEnum("role", ['system','user']).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		messagesProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const positions = mysqlTable("positions", {
	id: int("id").autoincrement().notNull(),
	companyId: int("company_id").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		positionsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const questions = mysqlTable("questions", {
	id: int("id").autoincrement().notNull(),
	text: text("text").notNull(),
},
(table) => {
	return {
		questionsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const resume = mysqlTable("resume", {
	id: int("id").autoincrement().notNull(),
	pdfName: text("pdf_name").notNull(),
	pdfUrl: text("pdf_url").notNull(),
	userId: varchar("user_id", { length: 191 }).notNull(),
	fileKey: text("file_key").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => {
	return {
		resumeProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const sessions = mysqlTable("sessions", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const stats = mysqlTable("stats", {
	id: int("id").autoincrement().notNull(),
	positiveExperience: varchar("positive_experience", { length: 20 }),
	negativeExperience: varchar("negative_experience", { length: 20 }),
	neutralExperience: varchar("neutral_experience", { length: 20 }),
	appliedOnline: varchar("applied_online", { length: 20 }),
	recruiter: varchar("recruiter", { length: 20 }),
	employeeReferral: varchar("employee_referral", { length: 20 }),
	difficulty: varchar("difficulty", { length: 20 }),
	companyId: int("company_id").notNull(),
},
(table) => {
	return {
		statsProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const users = mysqlTable("users", {
	id: varchar("id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: varchar("image", { length: 255 }),
},
(table) => {
	return {
		usersProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const verificationToken = mysqlTable("verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});