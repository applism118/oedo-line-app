import { SavedPlan, RouteStation, WalkingSpeed, Direction } from "@shared/schema";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "oedo-walking-plans";

// Convert dates to strings for storage and back for retrieval
function serializePlan(plan: SavedPlan): string {
  const serialized = {
    ...plan,
    startTime: plan.startTime.toISOString(),
    createdAt: plan.createdAt.toISOString(),
    stations: plan.stations.map(station => ({
      ...station,
      arrivalTime: station.arrivalTime.toISOString(),
      departureTime: station.departureTime ? station.departureTime.toISOString() : undefined
    }))
  };
  return JSON.stringify(serialized);
}

function deserializePlan(serialized: string): SavedPlan {
  const parsed = JSON.parse(serialized);
  return {
    ...parsed,
    startTime: new Date(parsed.startTime),
    createdAt: new Date(parsed.createdAt),
    stations: parsed.stations.map((station: any) => ({
      ...station,
      arrivalTime: new Date(station.arrivalTime),
      departureTime: station.departureTime ? new Date(station.departureTime) : undefined
    }))
  };
}

/**
 * Save a new walking plan to localStorage
 */
export function savePlan(
  fromStation: string,
  toStation: string,
  direction: Direction,
  walkingSpeed: WalkingSpeed,
  startTime: Date,
  restMinutes: number,
  totalDistance: number,
  stations: RouteStation[]
): SavedPlan {
  const existingPlansStr = localStorage.getItem(STORAGE_KEY);
  const existingPlans: SavedPlan[] = existingPlansStr 
    ? JSON.parse(existingPlansStr).map((p: string) => deserializePlan(p))
    : [];

  const newPlan: SavedPlan = {
    id: uuidv4(),
    fromStation,
    toStation,
    direction,
    walkingSpeed,
    startTime,
    restMinutes,
    totalDistance,
    createdAt: new Date(),
    stations
  };

  const updatedPlans = [newPlan, ...existingPlans];
  localStorage.setItem(
    STORAGE_KEY, 
    JSON.stringify(updatedPlans.map(p => serializePlan(p)))
  );

  return newPlan;
}

/**
 * Get all saved walking plans
 */
export function getSavedPlans(): SavedPlan[] {
  const plansStr = localStorage.getItem(STORAGE_KEY);
  if (!plansStr) return [];
  
  try {
    return JSON.parse(plansStr).map((p: string) => deserializePlan(p));
  } catch (error) {
    console.error("Error parsing saved plans:", error);
    return [];
  }
}

/**
 * Delete a specific plan by ID
 */
export function deletePlan(planId: string): void {
  const existingPlansStr = localStorage.getItem(STORAGE_KEY);
  if (!existingPlansStr) return;
  
  try {
    const existingPlans: SavedPlan[] = JSON.parse(existingPlansStr)
      .map((p: string) => deserializePlan(p))
      .filter((plan: SavedPlan) => plan.id !== planId);
    
    localStorage.setItem(
      STORAGE_KEY, 
      JSON.stringify(existingPlans.map(p => serializePlan(p)))
    );
  } catch (error) {
    console.error("Error deleting plan:", error);
  }
}

/**
 * Delete all saved plans
 */
export function deleteAllPlans(): void {
  localStorage.removeItem(STORAGE_KEY);
}
