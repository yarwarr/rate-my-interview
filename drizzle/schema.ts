import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, index, varchar, text, int, timestamp, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const accounts = mysqlTable("accounts", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	type: varchar("type", { length: 191 }).notNull(),
	provider: varchar("provider", { length: 191 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 191 }).notNull(),
	accessToken: text("access_token"),
	expiresIn: int("expires_in"),
	idToken: text("id_token"),
	refreshToken: text("refresh_token"),
	refreshTokenExpiresIn: int("refresh_token_expires_in"),
	scope: varchar("scope", { length: 191 }),
	tokenType: varchar("token_type", { length: 191 }),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		providerProviderAccountIdIdx: uniqueIndex("accounts__provider__providerAccountId__idx").on(table.provider, table.providerAccountId),
		userIdIdx: index("accounts__userId__idx").on(table.userId),
	}
});

export const companies = mysqlTable("companies", {
	id: int("id").autoincrement().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		name: uniqueIndex("name").on(table.name),
	}
});

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	sessionToken: varchar("sessionToken", { length: 191 }).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'string'}).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		sessionTokenIdx: uniqueIndex("sessions__sessionToken__idx").on(table.sessionToken),
		userIdIdx: index("sessions__userId__idx").on(table.userId),
	}
});

export const users = mysqlTable("users", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	name: varchar("name", { length: 191 }),
	email: varchar("email", { length: 191 }).notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: varchar("image", { length: 191 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		emailIdx: uniqueIndex("users__email__idx").on(table.email),
	}
});

export const verificationTokens = mysqlTable("verification_tokens", {
	identifier: varchar("identifier", { length: 191 }).primaryKey().notNull(),
	token: varchar("token", { length: 191 }).notNull(),
	expires: datetime("expires", { mode: 'string'}).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().onUpdateNow().notNull(),
},
(table) => {
	return {
		tokenIdx: uniqueIndex("verification_tokens__token__idx").on(table.token),
	}
});