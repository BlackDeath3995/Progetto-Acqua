import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const flowmeters = pgTable("flowmeters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  status: text("status").notNull(),
  currentFlowRate: real("current_flow_rate").notNull(),
  totalVolume: real("total_volume").notNull(),
  pressure: real("pressure"),
  temperature: real("temperature"),
  lastUpdated: timestamp("last_updated").notNull().default(sql`now()`),
});

export const flowmeterReadings = pgTable("flowmeter_readings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  flowmeterId: varchar("flowmeter_id").notNull(),
  flowRate: real("flow_rate").notNull(),
  volume: real("volume").notNull(),
  pressure: real("pressure"),
  temperature: real("temperature"),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
});

export const insertFlowmeterSchema = createInsertSchema(flowmeters).omit({
  id: true,
  lastUpdated: true,
});

export const insertFlowmeterReadingSchema = createInsertSchema(flowmeterReadings).omit({
  id: true,
  timestamp: true,
});

export type InsertFlowmeter = z.infer<typeof insertFlowmeterSchema>;
export type Flowmeter = typeof flowmeters.$inferSelect;
export type InsertFlowmeterReading = z.infer<typeof insertFlowmeterReadingSchema>;
export type FlowmeterReading = typeof flowmeterReadings.$inferSelect;
