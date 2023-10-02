import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, int, varchar, timestamp, text, index, datetime, mysqlEnum, primaryKey } from "drizzle-orm/mysql-core"
import { relations, sql} from "drizzle-orm"
// @ts-ignore
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import type { AdapterAccount } from "@auth/core/adapters";
// Run these commands to migrate and then push
// "migrate": "drizzle-kit generate:mysql",
// "db:push": "drizzle-kit push:mysql --config=drizzle.config.ts",

export const users = mysqlTable("users", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: varchar("image", { length: 255 }),
  })
  
  export const accounts = mysqlTable(
	"accounts",
	{
	  userId: varchar("userId", { length: 255 }).notNull(),
	  type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
	  provider: varchar("provider", { length: 255 }).notNull(),
	  providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	  refresh_token: varchar("refresh_token", { length: 255 }),
	  refresh_token_expires_in: int("refresh_token_expires_in"),
	  access_token: varchar("access_token", { length: 255 }),
	  expires_at: int("expires_at"),
	  token_type: varchar("token_type", { length: 255 }),
	  scope: varchar("scope", { length: 255 }),
	  id_token: text("id_token"),
	  session_state: text("session_state"),
	},
	(account) => ({
	  compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
  )
  
  export const sessions = mysqlTable("sessions", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
	userId: varchar("userId", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: "date" }).notNull(),
  })
  
  export const verificationTokens = mysqlTable(
	"verificationToken",
	{
	  identifier: varchar("identifier", { length: 255 }).notNull(),
	  token: varchar("token", { length: 255 }).notNull(),
	  expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
	  compoundKey: primaryKey(vt.identifier, vt.token),
	})
  )

export const stats = mysqlTable("stats", {
	id: int("id").autoincrement().primaryKey().notNull(),
	company_id: int("company_id").notNull(),
	positive_experience: varchar("positive_experience", { length: 20 }),
	negative_experience: varchar("negative_experience", { length: 20 }),
	neutral_experience: varchar("neutral_experience", { length: 20 }),
	applied_online: varchar("applied_online", { length: 20 }),
	recruiter: varchar("recruiter", { length: 20 }),
	employee_referral: varchar("employee_referral", { length: 20 }),
	difficulty: varchar("difficulty", { length: 20}),
  });



export const faqs = mysqlTable("faqs", {
	id: int("id").autoincrement().primaryKey().notNull(),
	company_id: int("company_id").notNull(),
	question: varchar("question", { length: 255 }).notNull(),
	answer: text("answer").notNull(),
  });
export const interview_to_questions = mysqlTable("interview_questions", {
	id: int("id").autoincrement().primaryKey().notNull(),
	interview_id: int("interview_id").notNull(),
	question_id: int("question_id").notNull(),
  });

export const questions = mysqlTable("questions", {
	id: int("id").autoincrement().primaryKey().notNull(),
	text: text("text").notNull(),
  });
export const interviews = mysqlTable("interviews", {
	id: int("id").autoincrement().primaryKey().notNull(),
	company_id: int("company_id").notNull(),
	interviewee_id: int("interviewee_id").notNull(),
	position_id: int("position_id").notNull(),
	offer_status: varchar("offer_status", { length: 255 }).notNull(),
	experience: varchar("experience", { length: 255 }).notNull(),
	difficulty: varchar("difficulty", { length: 255 }).notNull(),
	interview_process: text("interview_process").notNull(),
  });

export const positions = mysqlTable("positions", {
	id: int("id").autoincrement().primaryKey().notNull(),
	company_id: int("company_id").notNull(),
	name: varchar("name", { length: 255 }).notNull(),
  });

  export const interviewees = mysqlTable("interviewees", {
	id: int("id").autoincrement().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
  });

export const companies = mysqlTable("companies", {
	id: int("id").autoincrement().primaryKey().notNull(),
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
	pdfUrl: text('pdf_url')
  },
  (table) => {
	return {
	  name: uniqueIndex("name").on(table.name),
	};
  });

  export const chats = mysqlTable('chats',{
		id: int("id").autoincrement().primaryKey().notNull(),
		company_id: int("company_id"),
		pdfName: text('pdf_name').notNull(),
		pdfUrl: text('pdf_url').notNull(),
		user_id: varchar('user_id', { length: 191 }).notNull(),
		file_key: text('file_key').notNull(),
		created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
	});

export const resume = mysqlTable('resume',{
	id: int("id").autoincrement().primaryKey().notNull(),
	pdfName: text('pdf_name').notNull(),
	pdfUrl: text('pdf_url').notNull(),
	user_id: varchar('user_id', { length: 191 }).notNull(),
	file_key: text('file_key').notNull(),
	created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

	export const messages = mysqlTable('messages',{
		id: int("id").autoincrement().primaryKey().notNull(),
		chat_id: int("chat_id").notNull(),
		content: text('content').notNull(),
		role: mysqlEnum('role', ['system', 'user']).notNull(),
		created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
	});
  

//    All Relations:-

    // Company has many stats, stats belongs to company
	export const companyRelations = relations(companies, ({ many }) => ({
		stats: many(stats),
		faqs: many(faqs),
		interviews: many(interviews),
		positions: many(positions),
	}))


	export const statsRelations = relations(stats, ({ one }) => ({
		companies: one(companies, {
			fields: [stats.company_id],
			references: [companies.id],
		}),
	}))

	export const faqsRelations = relations(faqs, ({ one }) => ({
		companies: one(companies, {
			fields: [faqs.company_id],
			references: [companies.id],
		}),
	}))

	export const interviewsRelations = relations(interviews, ({ one, many }) => ({
		companies: one(companies, {
			fields: [interviews.company_id],
			references: [companies.id],
		}),
		interviewees: one(interviewees, {
			fields: [interviews.interviewee_id],
			references: [interviewees.id],
		}),
		positions: one(positions, {
			fields: [interviews.position_id],
			references: [positions.id],
		}),
		interviewToQuestions: many(interview_to_questions)

	}))

	export const positionsRelations = relations(positions, ({ one }) => ({
		companies: one(companies, {
			fields: [positions.company_id],
			references: [companies.id],
		}),
		interviews: one(interviews, {
			fields: [positions.id],
			references: [interviews.position_id],
		}),
	}))

	export const intervieweesRelations = relations(interviewees, ({ one }) => ({
		interviews: one(interviews, {
			fields: [interviewees.id],
			references: [interviews.interviewee_id],
		}),
	}))

	export const interviewToQuestionRelations = relations(interview_to_questions, ({ one, many }) => ({
		interviews: one(interviews, {
			fields: [interview_to_questions.interview_id],
			references: [interviews.id],
		}),
		questions: many(questions),
	}))

	export const questionsRelations = relations(questions, ({ one }) => ({
		interviewToQuestions: one(interview_to_questions, {
			fields: [questions.id],
			references: [interview_to_questions.question_id],
		}),
	}))

	// Relations of chat and messages

	export const chatsRelations = relations(chats, ({ one, many }) => ({
		messages: many(messages),
		users: one(users, {
			fields: [chats.user_id],
			references: [users.id],
		}),
		companies: one(companies, {
			fields: [chats.company_id],
			references: [companies.id],
		}),
	}))

	export const messagesRelations = relations(messages, ({ one }) => ({
		chats: one(chats, {
			fields: [messages.chat_id],
			references: [chats.id],
		}),

	}))

	// Relations of chat and users

	export const usersRelations = relations(users, ({ many }) => ({
		chats: many(chats),
	}))

	// Resume to User connection
	export const resumeRelations = relations(resume, ({ one }) => ({
		users: one(users, {
			fields: [resume.user_id],
			references: [users.id],
		}),
	}))



// Types
export type DrizzleChat = InferSelectModel<typeof chats>;



