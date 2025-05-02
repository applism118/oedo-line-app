import { StationZone } from "@shared/schema";

export interface OedoStation {
  name: string;
  zone: StationZone;
  nextDistance: number; // distance to next station in km
  cx: number; // x coordinate for SVG
  cy: number; // y coordinate for SVG
  textAnchor: "start" | "end" | "middle"; // text position
  textX: number; // text x coordinate
  textY: number; // text y coordinate
}

// Define walking speeds (km/h)
export const walkingSpeeds = [
  { id: "slow", value: 3, label: "ゆっくり (3km/h)" },
  { id: "normal", value: 4, label: "普通 (4km/h)" },
  { id: "fast", value: 5, label: "速い (5km/h)" }
];

// Linear zone stations (from Hikarigaoka to Tocho-mae) based on the image provided
export const linearStations: OedoStation[] = [
  { name: "光が丘", zone: "linear", nextDistance: 1.1, cx: 65, cy: 65, textAnchor: "middle", textX: 65, textY: 50 },
  { name: "練馬春日町", zone: "linear", nextDistance: 0.9, cx: 95, cy: 90, textAnchor: "middle", textX: 95, textY: 75 },
  { name: "豊島園", zone: "linear", nextDistance: 1.2, cx: 125, cy: 115, textAnchor: "middle", textX: 125, textY: 100 },
  { name: "練馬", zone: "linear", nextDistance: 1.1, cx: 155, cy: 140, textAnchor: "middle", textX: 155, textY: 125 },
  { name: "新江古田", zone: "linear", nextDistance: 1.3, cx: 185, cy: 165, textAnchor: "start", textX: 200, textY: 165 },
  { name: "落合南長崎", zone: "linear", nextDistance: 1.0, cx: 215, cy: 190, textAnchor: "start", textX: 230, textY: 190 },
  { name: "中井", zone: "linear", nextDistance: 0.8, cx: 245, cy: 215, textAnchor: "end", textX: 230, textY: 200 },
  { name: "東中野", zone: "linear", nextDistance: 1.1, cx: 275, cy: 240, textAnchor: "start", textX: 290, textY: 240 },
  { name: "中野坂上", zone: "linear", nextDistance: 1.0, cx: 305, cy: 265, textAnchor: "end", textX: 285, textY: 250 },
  { name: "西新宿五丁目", zone: "linear", nextDistance: 0.9, cx: 335, cy: 290, textAnchor: "start", textX: 350, textY: 290 },
  { name: "都庁前", zone: "linear", nextDistance: 0.0, cx: 320, cy: 330, textAnchor: "middle", textX: 320, textY: 345 }
];

// Circular zone stations - only on top and bottom edges as requested
export const circularStations: OedoStation[] = [
  // Bottom left corner (starting point)
  { name: "都庁前", zone: "circular", nextDistance: 0.7, cx: 220, cy: 450, textAnchor: "middle", textX: 220, textY: 470 },
  
  // Bottom edge (left to right) - from Tocho-mae to Kiyosumi-shirakawa
  { name: "新宿", zone: "circular", nextDistance: 0.9, cx: 248, cy: 450, textAnchor: "middle", textX: 248, textY: 470 },
  { name: "代々木", zone: "circular", nextDistance: 0.8, cx: 276, cy: 450, textAnchor: "middle", textX: 276, textY: 470 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.1, cx: 304, cy: 450, textAnchor: "middle", textX: 304, textY: 470 },
  { name: "青山一丁目", zone: "circular", nextDistance: 0.9, cx: 332, cy: 450, textAnchor: "middle", textX: 332, textY: 470 },
  { name: "六本木", zone: "circular", nextDistance: 0.8, cx: 360, cy: 450, textAnchor: "middle", textX: 360, textY: 470 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.0, cx: 388, cy: 450, textAnchor: "middle", textX: 388, textY: 470 },
  { name: "赤羽橋", zone: "circular", nextDistance: 0.8, cx: 416, cy: 450, textAnchor: "middle", textX: 416, textY: 470 },
  { name: "大門", zone: "circular", nextDistance: 0.9, cx: 444, cy: 450, textAnchor: "middle", textX: 444, textY: 470 },
  { name: "汐留", zone: "circular", nextDistance: 0.8, cx: 472, cy: 450, textAnchor: "middle", textX: 472, textY: 470 },
  { name: "築地市場", zone: "circular", nextDistance: 0.9, cx: 500, cy: 450, textAnchor: "middle", textX: 500, textY: 470 },
  { name: "勝どき", zone: "circular", nextDistance: 0.9, cx: 528, cy: 450, textAnchor: "middle", textX: 528, textY: 470 },
  { name: "月島", zone: "circular", nextDistance: 0.8, cx: 556, cy: 450, textAnchor: "middle", textX: 556, textY: 470 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.1, cx: 584, cy: 450, textAnchor: "middle", textX: 584, textY: 470 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.0, cx: 612, cy: 450, textAnchor: "middle", textX: 612, textY: 470 },
  
  // Right corner
  { name: "森下", zone: "circular", nextDistance: 0.9, cx: 640, cy: 210, textAnchor: "middle", textX: 640, textY: 190 },
  
  // Top edge (right to left) - from Morishita to Shinjuku-nishiguchi
  { name: "両国", zone: "circular", nextDistance: 0.8, cx: 612, cy: 210, textAnchor: "middle", textX: 612, textY: 190 },
  { name: "蔵前", zone: "circular", nextDistance: 0.8, cx: 584, cy: 210, textAnchor: "middle", textX: 584, textY: 190 },
  { name: "新御徒町", zone: "circular", nextDistance: 0.9, cx: 556, cy: 210, textAnchor: "middle", textX: 556, textY: 190 },
  { name: "上野御徒町", zone: "circular", nextDistance: 1.0, cx: 528, cy: 210, textAnchor: "middle", textX: 528, textY: 190 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.1, cx: 500, cy: 210, textAnchor: "middle", textX: 500, textY: 190 },
  { name: "春日", zone: "circular", nextDistance: 0.9, cx: 472, cy: 210, textAnchor: "middle", textX: 472, textY: 190 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.2, cx: 444, cy: 210, textAnchor: "middle", textX: 444, textY: 190 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.0, cx: 416, cy: 210, textAnchor: "middle", textX: 416, textY: 190 },
  { name: "牛込柳町", zone: "circular", nextDistance: 0.8, cx: 388, cy: 210, textAnchor: "middle", textX: 388, textY: 190 },
  { name: "若松河田", zone: "circular", nextDistance: 0.9, cx: 360, cy: 210, textAnchor: "middle", textX: 360, textY: 190 },
  { name: "東新宿", zone: "circular", nextDistance: 0.9, cx: 332, cy: 210, textAnchor: "middle", textX: 332, textY: 190 },
  { name: "新宿西口", zone: "circular", nextDistance: 0.8, cx: 304, cy: 210, textAnchor: "middle", textX: 304, textY: 190 },
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 220, cy: 210, textAnchor: "middle", textX: 220, textY: 190 }
];

// All stations merged
export const allStations: OedoStation[] = [...linearStations, ...circularStations.slice(1)];

// Find a station by name
export const findStation = (name: string): OedoStation | undefined => {
  return allStations.find(station => station.name === name);
};

// Get station names as options for select elements
export const getStationOptions = (): { value: string, label: string, zone: StationZone }[] => {
  const linearOptions = linearStations.map(station => ({
    value: station.name,
    label: station.name,
    zone: station.zone as StationZone
  }));
  
  const circularOptions = circularStations.slice(1, -1).map(station => ({
    value: station.name,
    label: station.name,
    zone: station.zone as StationZone
  }));
  
  return [...linearOptions, ...circularOptions];
};

// Get available rest times options
export const getRestTimeOptions = () => [
  { value: 15, label: "15分" },
  { value: 30, label: "30分" },
  { value: 60, label: "60分" }
];
