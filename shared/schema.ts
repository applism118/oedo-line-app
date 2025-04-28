import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Oedo Line station zones enum
export const stationZoneEnum = z.enum(["linear", "circular"]);
export type StationZone = z.infer<typeof stationZoneEnum>;

// Walking speed options
export const walkingSpeedEnum = z.enum(["slow", "normal", "fast"]);
export type WalkingSpeed = z.infer<typeof walkingSpeedEnum>;

// Direction options
export const directionEnum = z.enum(["clockwise", "counterclockwise"]);
export type Direction = z.infer<typeof directionEnum>;

// Station schema
export const stations = pgTable("stations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  zone: text("zone").notNull(),
  nextDistance: integer("next_distance").notNull(),
});

// Route plan schema
export const routePlans = pgTable("route_plans", {
  id: serial("id").primaryKey(),
  fromStation: text("from_station").notNull(),
  toStation: text("to_station").notNull(),
  direction: text("direction").notNull(),
  walkingSpeed: text("walking_speed").notNull(),
  startTime: timestamp("start_time").notNull(),
  restMinutes: integer("rest_minutes").notNull(),
  totalDistance: integer("total_distance").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User schema (for future authentication)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertStationSchema = createInsertSchema(stations);

export const insertRoutePlanSchema = createInsertSchema(routePlans).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStation = z.infer<typeof insertStationSchema>;
export type Station = typeof stations.$inferSelect;

export type InsertRoutePlan = z.infer<typeof insertRoutePlanSchema>;
export type RoutePlan = typeof routePlans.$inferSelect;

// Frontend specific types
export interface RouteStation {
  name: string;
  arrivalTime: Date;
  departureTime?: Date;
  isRestStation?: boolean;
}

export interface RouteResult {
  stations: RouteStation[];
  totalDistance: number;
}

export interface SavedPlan {
  id: string;
  fromStation: string;
  toStation: string;
  direction: Direction;
  walkingSpeed: WalkingSpeed;
  startTime: Date;
  restMinutes: number;
  totalDistance: number;
  createdAt: Date;
  stations: RouteStation[];
}
