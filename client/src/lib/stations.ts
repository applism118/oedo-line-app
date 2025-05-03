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

// Linear zone stations (from Hikarigaoka to Tocho-mae) - 均等間隔で縦方向に配置
export const linearStations: OedoStation[] = [
  { name: "光が丘", zone: "linear", nextDistance: 1.73, cx: 140, cy: 70, textAnchor: "start", textX: 160, textY: 70 },
  { name: "練馬春日町", zone: "linear", nextDistance: 1.33, cx: 140, cy: 120, textAnchor: "start", textX: 160, textY: 120 },
  { name: "豊島園", zone: "linear", nextDistance: 1.20, cx: 140, cy: 170, textAnchor: "start", textX: 160, textY: 170 },
  { name: "練馬", zone: "linear", nextDistance: 1.60, cx: 140, cy: 220, textAnchor: "start", textX: 160, textY: 220 },
  { name: "新江古田", zone: "linear", nextDistance: 1.33, cx: 140, cy: 270, textAnchor: "start", textX: 160, textY: 270 },
  { name: "落合南長崎", zone: "linear", nextDistance: 1.47, cx: 140, cy: 320, textAnchor: "start", textX: 160, textY: 320 },
  { name: "中井", zone: "linear", nextDistance: 1.20, cx: 140, cy: 370, textAnchor: "start", textX: 160, textY: 370 },
  { name: "東中野", zone: "linear", nextDistance: 1.33, cx: 140, cy: 420, textAnchor: "start", textX: 160, textY: 420 },
  { name: "中野坂上", zone: "linear", nextDistance: 1.60, cx: 140, cy: 470, textAnchor: "start", textX: 160, textY: 470 },
  { name: "西新宿五丁目", zone: "linear", nextDistance: 1.20, cx: 140, cy: 520, textAnchor: "start", textX: 160, textY: 520 },
  { name: "都庁前", zone: "linear", nextDistance: 0.0, cx: 140, cy: 570, textAnchor: "start", textX: 160, textY: 570 }
];

// 環状線ゾーン - 縦長楕円形に配置（添付画像を参考）
export const circularStations: OedoStation[] = [
  // 上部
  { name: "都庁前", zone: "circular", nextDistance: 0.67, cx: 160, cy: 70, textAnchor: "end", textX: 145, textY: 70 },
  { name: "新宿", zone: "circular", nextDistance: 0.93, cx: 180, cy: 70, textAnchor: "start", textX: 195, textY: 70 },
  { name: "新宿西口", zone: "circular", nextDistance: 1.73, cx: 200, cy: 80, textAnchor: "start", textX: 215, textY: 80 },
  
  // 右側縦線
  { name: "代々木", zone: "circular", nextDistance: 1.33, cx: 210, cy: 110, textAnchor: "start", textX: 225, textY: 110 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.60, cx: 210, cy: 140, textAnchor: "start", textX: 225, textY: 140 },
  { name: "青山一丁目", zone: "circular", nextDistance: 1.33, cx: 210, cy: 170, textAnchor: "start", textX: 225, textY: 170 },
  { name: "六本木", zone: "circular", nextDistance: 1.73, cx: 210, cy: 200, textAnchor: "start", textX: 225, textY: 200 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.20, cx: 210, cy: 230, textAnchor: "start", textX: 225, textY: 230 },
  { name: "赤羽橋", zone: "circular", nextDistance: 1.20, cx: 210, cy: 260, textAnchor: "start", textX: 225, textY: 260 },
  { name: "大門", zone: "circular", nextDistance: 1.60, cx: 210, cy: 290, textAnchor: "start", textX: 225, textY: 290 },
  { name: "汐留", zone: "circular", nextDistance: 1.07, cx: 210, cy: 320, textAnchor: "start", textX: 225, textY: 320 },
  { name: "築地市場", zone: "circular", nextDistance: 0.93, cx: 210, cy: 350, textAnchor: "start", textX: 225, textY: 350 },
  { name: "勝どき", zone: "circular", nextDistance: 1.47, cx: 210, cy: 380, textAnchor: "start", textX: 225, textY: 380 },
  
  // 下部
  { name: "月島", zone: "circular", nextDistance: 1.33, cx: 160, cy: 410, textAnchor: "middle", textX: 160, textY: 425 },
  
  // 左側縦線
  { name: "門前仲町", zone: "circular", nextDistance: 1.60, cx: 110, cy: 380, textAnchor: "end", textX: 95, textY: 380 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.33, cx: 110, cy: 350, textAnchor: "end", textX: 95, textY: 350 },
  { name: "森下", zone: "circular", nextDistance: 1.07, cx: 110, cy: 320, textAnchor: "end", textX: 95, textY: 320 },
  { name: "両国", zone: "circular", nextDistance: 1.20, cx: 110, cy: 290, textAnchor: "end", textX: 95, textY: 290 },
  { name: "蔵前", zone: "circular", nextDistance: 1.47, cx: 110, cy: 260, textAnchor: "end", textX: 95, textY: 260 },
  { name: "新御徒町", zone: "circular", nextDistance: 1.20, cx: 110, cy: 230, textAnchor: "end", textX: 95, textY: 230 },
  { name: "上野御徒町", zone: "circular", nextDistance: 0.80, cx: 110, cy: 200, textAnchor: "end", textX: 95, textY: 200 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.73, cx: 110, cy: 170, textAnchor: "end", textX: 95, textY: 170 },
  { name: "春日", zone: "circular", nextDistance: 0.93, cx: 110, cy: 140, textAnchor: "end", textX: 95, textY: 140 },
  
  // 左上部
  { name: "飯田橋", zone: "circular", nextDistance: 1.87, cx: 120, cy: 110, textAnchor: "end", textX: 105, textY: 110 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.07, cx: 130, cy: 95, textAnchor: "end", textX: 115, textY: 95 },
  { name: "牛込柳町", zone: "circular", nextDistance: 1.20, cx: 135, cy: 90, textAnchor: "end", textX: 120, textY: 90 },
  { name: "若松河田", zone: "circular", nextDistance: 1.07, cx: 140, cy: 85, textAnchor: "end", textX: 125, textY: 85 },
  { name: "東新宿", zone: "circular", nextDistance: 1.33, cx: 145, cy: 80, textAnchor: "end", textX: 130, textY: 80 },
  
  // 都庁前に戻る (最後の都庁前は実際には表示しない)
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 160, cy: 70, textAnchor: "end", textX: 145, textY: 70 }
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
