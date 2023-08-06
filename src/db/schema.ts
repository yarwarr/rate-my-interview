import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, int, varchar, timestamp, text, index,datetime } from "drizzle-orm/mysql-core"
import { relations, sql } from "drizzle-orm"
// Run these commands to migrate and then push
// "migrate": "drizzle-kit generate:mysql",
// "db:push": "drizzle-kit push:mysql --config=drizzle.config.ts",

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
  },
  (table) => {
	return {
	  name: uniqueIndex("name").on(table.name),
	};
  });

export const accounts = mysqlTable(
	'accounts',
	{
	  id: varchar('id', { length: 191 }).primaryKey().notNull(),
	  userId: varchar('userId', { length: 191 }).notNull(),
	  type: varchar('type', { length: 191 }).notNull(),
	  provider: varchar('provider', { length: 191 }).notNull(),
	  providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
	  access_token: text('access_token'),
	  expires_in: int('expires_in'),
	  id_token: text('id_token'),
	  refresh_token: text('refresh_token'),
	  refresh_token_expires_in: int('refresh_token_expires_in'),
	  scope: varchar('scope', { length: 191 }),
	  token_type: varchar('token_type', { length: 191 }),
	  createdAt: timestamp('createdAt').defaultNow().notNull(),
	  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
	},
	account => ({
	  providerProviderAccountIdIndex: uniqueIndex(
		'accounts__provider__providerAccountId__idx'
	  ).on(account.provider, account.providerAccountId),
	  userIdIndex: index('accounts__userId__idx').on(account.userId),
	})
  );
  
  export const sessions = mysqlTable(
	'sessions',
	{
	  id: varchar('id', { length: 191 }).primaryKey().notNull(),
	  sessionToken: varchar('sessionToken', { length: 191 }).notNull(),
	  userId: varchar('userId', { length: 191 }).notNull(),
	  expires: datetime('expires').notNull(),
	  created_at: timestamp('created_at').notNull().defaultNow(),
	  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
	},
	session => ({
	  sessionTokenIndex: uniqueIndex('sessions__sessionToken__idx').on(
		session.sessionToken
	  ),
	  userIdIndex: index('sessions__userId__idx').on(session.userId),
	})
  );
  
  export const users = mysqlTable(
	'users',
	{
	  id: varchar('id', { length: 191 }).primaryKey().notNull(),
	  name: varchar('name', { length: 191 }),
	  email: varchar('email', { length: 191 }).notNull(),
	  emailVerified: timestamp('emailVerified'),
	  image: varchar('image', { length: 191 }),
	  created_at: timestamp('created_at').notNull().defaultNow(),
	  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
	},
	user => ({
	  emailIndex: uniqueIndex('users__email__idx').on(user.email),
	})
  );
  
  export const verificationTokens = mysqlTable(
	'verification_tokens',
	{
	  identifier: varchar('identifier', { length: 191 }).primaryKey().notNull(),
	  token: varchar('token', { length: 191 }).notNull(),
	  expires: datetime('expires').notNull(),
	  created_at: timestamp('created_at').notNull().defaultNow(),
	  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
	},
	verificationToken => ({
	  tokenIndex: uniqueIndex('verification_tokens__token__idx').on(
		verificationToken.token
	  ),
	})
  );

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

	export const interviewToQuestionRelations = relations(interview_to_questions, ({ one, }) => ({
		interviews: one(interviews, {
			fields: [interview_to_questions.interview_id],
			references: [interviews.id],
		}),
		questions: one(questions, {
			fields: [interview_to_questions.question_id],
			references: [questions.id],
		}),
	}))

	export const questionsRelations = relations(questions, ({ one }) => ({
		interviewToQuestions: one(interview_to_questions, {
			fields: [questions.id],
			references: [interview_to_questions.question_id],
		}),
	}))





