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

// Circular zone stations based on the image provided
export const circularStations: OedoStation[] = [
  { name: "都庁前", zone: "circular", nextDistance: 0.7, cx: 320, cy: 330, textAnchor: "middle", textX: 320, textY: 315 },
  { name: "新宿西口", zone: "circular", nextDistance: 0.8, cx: 367, cy: 363, textAnchor: "start", textX: 377, textY: 363 },
  { name: "東新宿", zone: "circular", nextDistance: 0.9, cx: 395, cy: 385, textAnchor: "end", textX: 380, textY: 395 },
  { name: "若松河田", zone: "circular", nextDistance: 0.9, cx: 417, cy: 408, textAnchor: "start", textX: 432, textY: 408 },
  { name: "牛込柳町", zone: "circular", nextDistance: 0.8, cx: 445, cy: 430, textAnchor: "start", textX: 460, textY: 430 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.0, cx: 465, cy: 450, textAnchor: "start", textX: 480, textY: 450 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.2, cx: 490, cy: 475, textAnchor: "end", textX: 475, textY: 490 },
  { name: "春日", zone: "circular", nextDistance: 0.9, cx: 515, cy: 490, textAnchor: "start", textX: 530, textY: 490 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.1, cx: 550, cy: 490, textAnchor: "start", textX: 565, textY: 490 },
  { name: "上野御徒町", zone: "circular", nextDistance: 1.0, cx: 585, cy: 480, textAnchor: "start", textX: 600, textY: 480 },
  { name: "新御徒町", zone: "circular", nextDistance: 0.9, cx: 610, cy: 455, textAnchor: "end", textX: 595, textY: 465 },
  { name: "蔵前", zone: "circular", nextDistance: 0.8, cx: 620, cy: 435, textAnchor: "middle", textX: 620, textY: 420 },
  { name: "両国", zone: "circular", nextDistance: 0.8, cx: 620, cy: 400, textAnchor: "start", textX: 635, textY: 400 },
  { name: "森下", zone: "circular", nextDistance: 0.9, cx: 610, cy: 370, textAnchor: "start", textX: 625, textY: 370 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.0, cx: 595, cy: 345, textAnchor: "start", textX: 610, textY: 345 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.1, cx: 575, cy: 320, textAnchor: "start", textX: 590, textY: 320 },
  { name: "月島", zone: "circular", nextDistance: 0.8, cx: 550, cy: 300, textAnchor: "start", textX: 565, textY: 300 },
  { name: "勝どき", zone: "circular", nextDistance: 0.9, cx: 525, cy: 280, textAnchor: "start", textX: 540, textY: 280 },
  { name: "築地市場", zone: "circular", nextDistance: 0.9, cx: 495, cy: 265, textAnchor: "end", textX: 480, textY: 265 },
  { name: "汐留", zone: "circular", nextDistance: 0.8, cx: 460, cy: 255, textAnchor: "end", textX: 445, textY: 255 },
  { name: "大門", zone: "circular", nextDistance: 0.9, cx: 425, cy: 245, textAnchor: "end", textX: 410, textY: 245 },
  { name: "赤羽橋", zone: "circular", nextDistance: 0.8, cx: 395, cy: 242, textAnchor: "end", textX: 380, textY: 242 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.0, cx: 365, cy: 240, textAnchor: "end", textX: 350, textY: 240 },
  { name: "六本木", zone: "circular", nextDistance: 0.8, cx: 330, cy: 245, textAnchor: "end", textX: 315, textY: 245 },
  { name: "青山一丁目", zone: "circular", nextDistance: 0.9, cx: 295, cy: 255, textAnchor: "end", textX: 280, textY: 255 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.1, cx: 260, cy: 270, textAnchor: "end", textX: 245, textY: 270 },
  { name: "代々木", zone: "circular", nextDistance: 0.8, cx: 240, cy: 290, textAnchor: "end", textX: 225, textY: 290 },
  { name: "新宿", zone: "circular", nextDistance: 0.9, cx: 270, cy: 320, textAnchor: "end", textX: 255, textY: 320 },
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 320, cy: 330, textAnchor: "middle", textX: 320, textY: 315 }
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
