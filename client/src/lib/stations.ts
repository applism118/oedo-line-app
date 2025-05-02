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

// Linear zone stations (from Hikarigaoka to Tocho-mae)
export const linearStations: OedoStation[] = [
  { name: "光が丘", zone: "linear", nextDistance: 1.1, cx: 80, cy: 100, textAnchor: "end", textX: 65, textY: 85 },
  { name: "練馬春日町", zone: "linear", nextDistance: 0.9, cx: 120, cy: 120, textAnchor: "end", textX: 105, textY: 105 },
  { name: "豊島園", zone: "linear", nextDistance: 1.2, cx: 160, cy: 140, textAnchor: "end", textX: 145, textY: 125 },
  { name: "練馬", zone: "linear", nextDistance: 1.1, cx: 200, cy: 160, textAnchor: "end", textX: 185, textY: 145 },
  { name: "新江古田", zone: "linear", nextDistance: 1.3, cx: 240, cy: 180, textAnchor: "start", textX: 255, textY: 165 },
  { name: "落合南長崎", zone: "linear", nextDistance: 1.0, cx: 280, cy: 200, textAnchor: "start", textX: 295, textY: 185 },
  { name: "中井", zone: "linear", nextDistance: 0.8, cx: 320, cy: 220, textAnchor: "end", textX: 305, textY: 205 },
  { name: "東中野", zone: "linear", nextDistance: 1.1, cx: 360, cy: 240, textAnchor: "start", textX: 375, textY: 225 },
  { name: "中野坂上", zone: "linear", nextDistance: 1.0, cx: 400, cy: 260, textAnchor: "end", textX: 385, textY: 245 },
  { name: "西新宿五丁目", zone: "linear", nextDistance: 0.9, cx: 440, cy: 280, textAnchor: "start", textX: 455, textY: 265 },
  { name: "都庁前", zone: "linear", nextDistance: 0.0, cx: 480, cy: 300, textAnchor: "middle", textX: 480, textY: 285 }
];

// Circular zone stations (starting from Tocho-mae, going clockwise)
// Using a rounded rectangle shape for better mobile viewing
export const circularStations: OedoStation[] = [
  { name: "都庁前", zone: "circular", nextDistance: 0.7, cx: 480, cy: 300, textAnchor: "middle", textX: 480, textY: 285 },
  { name: "新宿西口", zone: "circular", nextDistance: 0.8, cx: 525, cy: 308, textAnchor: "start", textX: 545, textY: 308 },
  { name: "東新宿", zone: "circular", nextDistance: 0.9, cx: 562, cy: 322, textAnchor: "start", textX: 580, textY: 322 },
  { name: "若松河田", zone: "circular", nextDistance: 0.9, cx: 586, cy: 344, textAnchor: "start", textX: 600, textY: 344 },
  { name: "牛込柳町", zone: "circular", nextDistance: 0.8, cx: 600, cy: 370, textAnchor: "start", textX: 615, textY: 370 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.0, cx: 605, cy: 397, textAnchor: "start", textX: 620, textY: 397 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.2, cx: 600, cy: 424, textAnchor: "start", textX: 615, textY: 424 },
  { name: "春日", zone: "circular", nextDistance: 0.9, cx: 586, cy: 450, textAnchor: "start", textX: 600, textY: 450 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.1, cx: 562, cy: 472, textAnchor: "start", textX: 580, textY: 472 },
  { name: "上野御徒町", zone: "circular", nextDistance: 1.0, cx: 525, cy: 486, textAnchor: "middle", textX: 525, textY: 506 },
  { name: "新御徒町", zone: "circular", nextDistance: 0.9, cx: 480, cy: 492, textAnchor: "middle", textX: 480, textY: 512 },
  { name: "蔵前", zone: "circular", nextDistance: 0.8, cx: 435, cy: 486, textAnchor: "middle", textX: 435, textY: 506 },
  { name: "両国", zone: "circular", nextDistance: 0.8, cx: 398, cy: 472, textAnchor: "end", textX: 380, textY: 472 },
  { name: "森下", zone: "circular", nextDistance: 0.9, cx: 374, cy: 450, textAnchor: "end", textX: 359, textY: 450 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.0, cx: 360, cy: 424, textAnchor: "end", textX: 345, textY: 424 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.1, cx: 355, cy: 397, textAnchor: "end", textX: 340, textY: 397 },
  { name: "月島", zone: "circular", nextDistance: 0.8, cx: 360, cy: 370, textAnchor: "end", textX: 345, textY: 370 },
  { name: "勝どき", zone: "circular", nextDistance: 0.9, cx: 374, cy: 344, textAnchor: "end", textX: 359, textY: 344 },
  { name: "築地市場", zone: "circular", nextDistance: 0.9, cx: 398, cy: 322, textAnchor: "end", textX: 380, textY: 322 },
  { name: "汐留", zone: "circular", nextDistance: 0.8, cx: 435, cy: 308, textAnchor: "end", textX: 420, textY: 308 },
  { name: "大門", zone: "circular", nextDistance: 0.9, cx: 435, cy: 270, textAnchor: "end", textX: 420, textY: 270 },
  { name: "赤羽橋", zone: "circular", nextDistance: 0.8, cx: 450, cy: 240, textAnchor: "end", textX: 435, textY: 240 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.0, cx: 470, cy: 220, textAnchor: "middle", textX: 470, textY: 205 },
  { name: "六本木", zone: "circular", nextDistance: 0.8, cx: 493, cy: 210, textAnchor: "middle", textX: 493, textY: 195 },
  { name: "青山一丁目", zone: "circular", nextDistance: 0.9, cx: 516, cy: 220, textAnchor: "start", textX: 531, textY: 205 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.1, cx: 536, cy: 240, textAnchor: "start", textX: 551, textY: 240 },
  { name: "代々木", zone: "circular", nextDistance: 0.8, cx: 551, cy: 270, textAnchor: "start", textX: 566, textY: 270 },
  { name: "新宿", zone: "circular", nextDistance: 0.9, cx: 516, cy: 292, textAnchor: "start", textX: 531, textY: 292 },
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 480, cy: 300, textAnchor: "middle", textX: 480, textY: 285 }
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
