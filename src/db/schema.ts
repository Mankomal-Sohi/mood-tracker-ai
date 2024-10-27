import { relations } from 'drizzle-orm';

import {
  serial,
  text,
  timestamp,
  integer,
  pgTable,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: text('name').unique(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const journalEntry = pgTable('journalEntry', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const analysis = pgTable('analysis', {
  id: serial('id').primaryKey(),
  entry_id: integer('entry_id').references(() => journalEntry.id),
  userId: integer('user_id').references(() => users.id),
  mood: text('mood').notNull(),
  summary: text('summary').notNull(),
  color: text('color').notNull(),
  negative: boolean('negative').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const journalRelations = relations(journalEntry, ({ one, many }) => ({
  user: one(users, { fields: [journalEntry.userId], references: [users.id] }),
  analysis: many(analysis),
}));

export const usersRelations = relations(users, ({ many }) => ({
  journalEntry: many(journalEntry),
}));

export const analysisRelations = relations(analysis, ({ one }) => ({
  post: one(journalEntry, {
    fields: [analysis.entry_id],
    references: [journalEntry.id],
  }),
  user: one(users, { fields: [analysis.userId], references: [users.id] }),
}));
