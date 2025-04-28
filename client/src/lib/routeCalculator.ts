import { Direction, RouteResult, RouteStation } from "@shared/schema";
import { linearStations, circularStations } from "./stations";

/**
 * Calculates the route between two stations on the Oedo Line
 */
export function calculateRoute(
  fromStation: string,
  toStation: string,
  speedKmh: number,
  startTime: Date,
  direction: Direction = "clockwise",
  restMinutes: number = 30
): RouteResult {
  // Find the indices of stations in their respective zones
  const fromLinearIdx = linearStations.findIndex(s => s.name === fromStation);
  const fromCircularIdx = circularStations.findIndex(s => s.name === fromStation);
  const toLinearIdx = linearStations.findIndex(s => s.name === toStation);
  const toCircularIdx = circularStations.findIndex(s => s.name === toStation);

  const route: RouteStation[] = [];
  let totalDistance = 0;
  let currentTime = new Date(startTime);

  // Case 1: Both stations are in the linear zone
  if (fromLinearIdx !== -1 && toLinearIdx !== -1) {
    return calculateLinearRoute(fromLinearIdx, toLinearIdx, speedKmh, currentTime, restMinutes);
  }

  // Case 2: Both stations are in the circular zone
  if (fromCircularIdx !== -1 && toCircularIdx !== -1) {
    return calculateCircularRoute(fromCircularIdx, toCircularIdx, speedKmh, currentTime, direction, restMinutes);
  }

  // Case 3: From linear to circular
  if (fromLinearIdx !== -1 && toCircularIdx !== -1) {
    // First go from linear to Tocho-mae (connection point)
    const linearResult = calculateLinearRoute(
      fromLinearIdx, 
      linearStations.length - 1, // Tocho-mae in linear
      speedKmh,
      currentTime,
      restMinutes
    );
    
    // Then from Tocho-mae to destination in circular
    const tochoMaeCircularIdx = circularStations.findIndex(s => s.name === "都庁前");
    const circularResult = calculateCircularRoute(
      tochoMaeCircularIdx,
      toCircularIdx,
      speedKmh,
      linearResult.stations[linearResult.stations.length - 1].arrivalTime,
      direction,
      restMinutes,
      linearResult.stations.length
    );

    // Combine routes (excluding duplicated Tocho-mae)
    const combinedStations = [
      ...linearResult.stations,
      ...circularResult.stations.slice(1)
    ];

    return {
      stations: combinedStations,
      totalDistance: linearResult.totalDistance + circularResult.totalDistance
    };
  }

  // Case 4: From circular to linear
  if (fromCircularIdx !== -1 && toLinearIdx !== -1) {
    // First go from circular to Tocho-mae (connection point)
    const circularResult = calculateCircularRoute(
      fromCircularIdx,
      0, // Tocho-mae in circular
      speedKmh,
      currentTime,
      direction,
      restMinutes
    );
    
    // Then from Tocho-mae to destination in linear
    const linearResult = calculateLinearRoute(
      linearStations.length - 1, // Tocho-mae in linear
      toLinearIdx,
      speedKmh,
      circularResult.stations[circularResult.stations.length - 1].arrivalTime,
      restMinutes,
      circularResult.stations.length
    );

    // Combine routes (excluding duplicated Tocho-mae)
    const combinedStations = [
      ...circularResult.stations,
      ...linearResult.stations.slice(1)
    ];

    return {
      stations: combinedStations,
      totalDistance: circularResult.totalDistance + linearResult.totalDistance
    };
  }

  // Shouldn't reach here but for safety
  throw new Error("Invalid stations selected");
}

/**
 * Calculate route between two stations in the linear zone
 */
function calculateLinearRoute(
  fromIdx: number,
  toIdx: number,
  speedKmh: number,
  startTime: Date,
  restMinutes: number,
  previousStationCount = 0
): RouteResult {
  const route: RouteStation[] = [];
  let totalDistance = 0;
  let currentTime = new Date(startTime);
  let stationCount = previousStationCount;

  // Determine direction (up or down the line)
  const ascending = fromIdx < toIdx;
  let currentIdx = fromIdx;
  
  // Add starting station
  route.push({
    name: linearStations[currentIdx].name,
    arrivalTime: new Date(currentTime),
    departureTime: new Date(currentTime)
  });
  
  // Traverse stations until destination
  while (currentIdx !== toIdx) {
    let nextIdx = ascending ? currentIdx + 1 : currentIdx - 1;
    let distance = ascending 
      ? linearStations[currentIdx].nextDistance
      : linearStations[nextIdx].nextDistance;
    
    // Calculate travel time
    const timeHours = distance / speedKmh;
    const timeMs = timeHours * 60 * 60 * 1000;
    
    // Move to next station
    currentIdx = nextIdx;
    currentTime = new Date(currentTime.getTime() + timeMs);
    
    // Is this a rest station? (every 5 stations except start and end)
    stationCount++;
    const isRestStation = (stationCount % 5 === 0) && 
                          (stationCount !== 0) && 
                          (currentIdx !== toIdx);
    
    const arrivalTime = new Date(currentTime);
    let departureTime: Date | undefined = undefined;
    
    // If rest station, add rest time
    if (isRestStation) {
      departureTime = new Date(currentTime.getTime() + restMinutes * 60 * 1000);
      currentTime = new Date(departureTime);
    }
    
    // Add station to route
    route.push({
      name: linearStations[currentIdx].name,
      arrivalTime,
      departureTime,
      isRestStation
    });
    
    totalDistance += distance;
  }
  
  return { stations: route, totalDistance };
}

/**
 * Calculate route between two stations in the circular zone
 */
function calculateCircularRoute(
  fromIdx: number,
  toIdx: number,
  speedKmh: number,
  startTime: Date,
  direction: Direction,
  restMinutes: number,
  previousStationCount = 0
): RouteResult {
  const route: RouteStation[] = [];
  let totalDistance = 0;
  let currentTime = new Date(startTime);
  let stationCount = previousStationCount;
  let currentIdx = fromIdx;
  
  // Add starting station
  route.push({
    name: circularStations[currentIdx].name,
    arrivalTime: new Date(currentTime),
    departureTime: new Date(currentTime)
  });
  
  // Handle case where start and end are the same (full circle)
  const isSameStation = fromIdx === toIdx && fromIdx !== 0;
  const lastIdx = isSameStation ? 
    circularStations.length - 1 : // Go around full circle 
    toIdx;
  
  // Traverse stations until destination
  while (currentIdx !== lastIdx) {
    let nextIdx;
    
    if (direction === "clockwise") {
      nextIdx = (currentIdx + 1) % circularStations.length;
    } else {
      nextIdx = (currentIdx - 1 + circularStations.length) % circularStations.length;
    }
    
    let distance = direction === "clockwise" 
      ? circularStations[currentIdx].nextDistance
      : circularStations[nextIdx].nextDistance;
    
    // Calculate travel time
    const timeHours = distance / speedKmh;
    const timeMs = timeHours * 60 * 60 * 1000;
    
    // Move to next station
    currentIdx = nextIdx;
    currentTime = new Date(currentTime.getTime() + timeMs);
    
    // Is this a rest station? (every 5 stations except start and end)
    stationCount++;
    const isRestStation = (stationCount % 5 === 0) && 
                          (stationCount !== 0) && 
                          (currentIdx !== toIdx);
    
    const arrivalTime = new Date(currentTime);
    let departureTime: Date | undefined = undefined;
    
    // If rest station, add rest time
    if (isRestStation) {
      departureTime = new Date(currentTime.getTime() + restMinutes * 60 * 1000);
      currentTime = new Date(departureTime);
    }
    
    // Add station to route
    route.push({
      name: circularStations[currentIdx].name,
      arrivalTime,
      departureTime,
      isRestStation
    });
    
    totalDistance += distance;
    
    // If we're doing a full circle and reached the original station again, break
    if (isSameStation && currentIdx === fromIdx) {
      break;
    }
  }
  
  // For full circle case, add Tocho-mae at the end if needed
  if (isSameStation && toIdx === 0) {
    const lastStation = route[route.length - 1];
    let distance = direction === "clockwise" 
      ? circularStations[circularStations.length - 1].nextDistance
      : circularStations[0].nextDistance;
      
    const timeHours = distance / speedKmh;
    const timeMs = timeHours * 60 * 60 * 1000;
    
    const arrivalTime = new Date(
      (lastStation.departureTime || lastStation.arrivalTime).getTime() + timeMs
    );
    
    route.push({
      name: "都庁前",
      arrivalTime
    });
    
    totalDistance += distance;
  }
  
  return { stations: route, totalDistance };
}

// Calculate the total time (including walking and rest) in hours
export function calculateTotalTime(route: RouteResult): number {
  if (route.stations.length < 2) return 0;
  
  const startTime = route.stations[0].arrivalTime;
  const lastStation = route.stations[route.stations.length - 1];
  const endTime = lastStation.arrivalTime;
  
  // Calculate time difference in milliseconds
  const timeDiffMs = endTime.getTime() - startTime.getTime();
  
  // Convert to hours
  return timeDiffMs / (1000 * 60 * 60);
}

// Format time for display (HH:MM)
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', { 
    hour: '2-digit', 
    minute:'2-digit', 
    hour12: false 
  });
}
