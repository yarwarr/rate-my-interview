import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, int, varchar, timestamp, text, index,datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

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