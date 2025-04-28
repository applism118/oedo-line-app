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
  { name: "光が丘", zone: "linear", nextDistance: 1.1, cx: 140, cy: 80, textAnchor: "end", textX: 120, textY: 70 },
  { name: "練馬春日町", zone: "linear", nextDistance: 0.9, cx: 170, cy: 95, textAnchor: "end", textX: 150, textY: 85 },
  { name: "豊島園", zone: "linear", nextDistance: 1.2, cx: 200, cy: 110, textAnchor: "end", textX: 180, textY: 100 },
  { name: "練馬", zone: "linear", nextDistance: 1.1, cx: 230, cy: 125, textAnchor: "end", textX: 210, textY: 115 },
  { name: "新江古田", zone: "linear", nextDistance: 1.3, cx: 260, cy: 140, textAnchor: "end", textX: 240, textY: 130 },
  { name: "落合南長崎", zone: "linear", nextDistance: 1.0, cx: 290, cy: 155, textAnchor: "end", textX: 270, textY: 145 },
  { name: "中井", zone: "linear", nextDistance: 0.8, cx: 320, cy: 170, textAnchor: "end", textX: 300, textY: 160 },
  { name: "東中野", zone: "linear", nextDistance: 1.1, cx: 330, cy: 180, textAnchor: "end", textX: 310, textY: 170 },
  { name: "中野坂上", zone: "linear", nextDistance: 1.0, cx: 340, cy: 190, textAnchor: "end", textX: 320, textY: 180 },
  { name: "西新宿五丁目", zone: "linear", nextDistance: 0.9, cx: 345, cy: 195, textAnchor: "end", textX: 325, textY: 185 },
  { name: "都庁前", zone: "linear", nextDistance: 0.0, cx: 350, cy: 200, textAnchor: "start", textX: 370, textY: 200 }
];

// Circular zone stations (starting from Tocho-mae, going clockwise)
export const circularStations: OedoStation[] = [
  { name: "都庁前", zone: "circular", nextDistance: 0.7, cx: 350, cy: 200, textAnchor: "start", textX: 370, textY: 200 },
  { name: "新宿西口", zone: "circular", nextDistance: 0.8, cx: 375, cy: 210, textAnchor: "start", textX: 395, textY: 210 },
  { name: "東新宿", zone: "circular", nextDistance: 1.1, cx: 400, cy: 220, textAnchor: "start", textX: 420, textY: 220 },
  { name: "若松河田", zone: "circular", nextDistance: 0.9, cx: 430, cy: 240, textAnchor: "start", textX: 450, textY: 240 },
  { name: "牛込柳町", zone: "circular", nextDistance: 0.8, cx: 460, cy: 260, textAnchor: "start", textX: 480, textY: 260 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.0, cx: 490, cy: 280, textAnchor: "start", textX: 510, textY: 280 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.2, cx: 520, cy: 300, textAnchor: "start", textX: 540, textY: 300 },
  { name: "春日", zone: "circular", nextDistance: 0.9, cx: 535, cy: 320, textAnchor: "start", textX: 555, textY: 320 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.1, cx: 550, cy: 340, textAnchor: "start", textX: 570, textY: 340 },
  { name: "上野御徒町", zone: "circular", nextDistance: 1.0, cx: 560, cy: 360, textAnchor: "start", textX: 580, textY: 360 },
  { name: "新御徒町", zone: "circular", nextDistance: 0.9, cx: 550, cy: 380, textAnchor: "start", textX: 570, textY: 380 },
  { name: "蔵前", zone: "circular", nextDistance: 1.0, cx: 530, cy: 400, textAnchor: "start", textX: 550, textY: 400 },
  { name: "両国", zone: "circular", nextDistance: 0.8, cx: 500, cy: 420, textAnchor: "start", textX: 520, textY: 420 },
  { name: "森下", zone: "circular", nextDistance: 0.9, cx: 470, cy: 435, textAnchor: "start", textX: 490, textY: 435 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.0, cx: 440, cy: 445, textAnchor: "start", textX: 460, textY: 445 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.1, cx: 410, cy: 450, textAnchor: "start", textX: 430, textY: 450 },
  { name: "月島", zone: "circular", nextDistance: 0.8, cx: 380, cy: 445, textAnchor: "start", textX: 400, textY: 445 },
  { name: "勝どき", zone: "circular", nextDistance: 0.9, cx: 350, cy: 435, textAnchor: "start", textX: 370, textY: 435 },
  { name: "築地市場", zone: "circular", nextDistance: 1.0, cx: 320, cy: 420, textAnchor: "start", textX: 340, textY: 420 },
  { name: "汐留", zone: "circular", nextDistance: 0.9, cx: 290, cy: 400, textAnchor: "start", textX: 310, textY: 400 },
  { name: "大門", zone: "circular", nextDistance: 0.8, cx: 270, cy: 380, textAnchor: "start", textX: 290, textY: 380 },
  { name: "赤羽橋", zone: "circular", nextDistance: 0.9, cx: 250, cy: 360, textAnchor: "start", textX: 270, textY: 360 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.0, cx: 230, cy: 340, textAnchor: "start", textX: 250, textY: 340 },
  { name: "六本木", zone: "circular", nextDistance: 0.8, cx: 220, cy: 320, textAnchor: "start", textX: 240, textY: 320 },
  { name: "青山一丁目", zone: "circular", nextDistance: 0.9, cx: 210, cy: 300, textAnchor: "start", textX: 230, textY: 300 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.1, cx: 200, cy: 280, textAnchor: "start", textX: 220, textY: 280 },
  { name: "代々木", zone: "circular", nextDistance: 0.8, cx: 210, cy: 260, textAnchor: "start", textX: 230, textY: 260 },
  { name: "新宿", zone: "circular", nextDistance: 0.9, cx: 230, cy: 240, textAnchor: "end", textX: 210, textY: 240 },
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 350, cy: 200, textAnchor: "start", textX: 370, textY: 200 }
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
