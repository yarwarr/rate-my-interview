import { mysqlTable, mysqlSchema, AnyMySqlColumn, uniqueIndex, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const companies = mysqlTable("companies", {
	id: int("id").autoincrement().primaryKey().notNull(),
	name: varchar("name", { length: 255 }).notNull(),
},
(table) => {
	return {
		name: uniqueIndex("name").on(table.name),
	}
});