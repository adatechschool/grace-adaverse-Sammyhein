import { integer, pgTable, varchar, date, text } from "drizzle-orm/pg-core";
import { relations, sql } from 'drizzle-orm';

export const adaProjects = pgTable("ada_projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 50 }).notNull(),
})

export const promotionsAda = pgTable("promotions_ada", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 50 }).notNull(),
    date: date("starting_date").notNull()
})

export const studentProjects = pgTable("student_projects", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 50 }).notNull(),
    image: text("image_url"),
    slug: varchar({ length: 50 }).notNull(),
    github: text("github_url").notNull(),
    demo: text("demo_url"),
    dateCreation : date("date_creation").notNull().default(sql`CURRENT_DATE`),
    datePublish : date("date_published"),
    adaProjectsId: integer('ada_projects_id').references(() => adaProjects.id).notNull(),
    promotionAdaId: integer('promotion_ada_id').references(() => promotionsAda.id).notNull()
})

export const adaProjectsStudentRelations = relations(adaProjects, ({many}) => ({
    studentProjects: many(studentProjects),
}));

export const studentAdaProjectsRelations = relations(studentProjects,({one}) => ({
    adaProject: one(adaProjects, {
		fields: [studentProjects.adaProjectsId],
		references: [adaProjects.id],
	}),
}));

export const promotionStudentRelations = relations(promotionsAda, ({ many }) => ({
	studentProjects: many(studentProjects),
}));

export const studentPromotionsRelations = relations(studentProjects, ({ one }) => ({
	promotion: one(promotionsAda, {
		fields: [studentProjects.promotionAdaId],
		references: [promotionsAda.id],
	}),
}));