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

// Linear zone stations (from Hikarigaoka to Tocho-mae) - 添付画像のように縦方向に配置
export const linearStations: OedoStation[] = [
  { name: "光が丘", zone: "linear", nextDistance: 1.1, cx: 140, cy: 70, textAnchor: "start", textX: 160, textY: 70 },
  { name: "練馬春日町", zone: "linear", nextDistance: 0.9, cx: 140, cy: 100, textAnchor: "start", textX: 160, textY: 100 },
  { name: "豊島園", zone: "linear", nextDistance: 1.2, cx: 140, cy: 150, textAnchor: "start", textX: 160, textY: 150 },
  { name: "練馬", zone: "linear", nextDistance: 1.1, cx: 140, cy: 200, textAnchor: "start", textX: 160, textY: 200 },
  { name: "新江古田", zone: "linear", nextDistance: 1.3, cx: 140, cy: 250, textAnchor: "start", textX: 160, textY: 250 },
  { name: "落合南長崎", zone: "linear", nextDistance: 1.0, cx: 140, cy: 300, textAnchor: "start", textX: 160, textY: 300 },
  { name: "中井", zone: "linear", nextDistance: 0.8, cx: 140, cy: 350, textAnchor: "start", textX: 160, textY: 350 },
  { name: "東中野", zone: "linear", nextDistance: 1.1, cx: 140, cy: 400, textAnchor: "start", textX: 160, textY: 400 },
  { name: "中野坂上", zone: "linear", nextDistance: 1.0, cx: 140, cy: 450, textAnchor: "start", textX: 160, textY: 450 },
  { name: "西新宿五丁目", zone: "linear", nextDistance: 0.9, cx: 140, cy: 500, textAnchor: "start", textX: 160, textY: 500 },
  { name: "都庁前", zone: "linear", nextDistance: 0.0, cx: 140, cy: 550, textAnchor: "start", textX: 160, textY: 550 }
];

// 環状線ゾーン - 添付画像のように縦長長方形に配置
export const circularStations: OedoStation[] = [
  // スタート（都庁前）
  { name: "都庁前", zone: "circular", nextDistance: 0.7, cx: 80, cy: 80, textAnchor: "end", textX: 65, textY: 80 },
  
  // 右側縦線 (上から下へ)
  { name: "新宿", zone: "circular", nextDistance: 0.9, cx: 140, cy: 80, textAnchor: "start", textX: 155, textY: 80 },
  { name: "代々木", zone: "circular", nextDistance: 0.8, cx: 200, cy: 120, textAnchor: "start", textX: 215, textY: 120 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.1, cx: 200, cy: 160, textAnchor: "start", textX: 215, textY: 160 },
  { name: "青山一丁目", zone: "circular", nextDistance: 0.9, cx: 200, cy: 200, textAnchor: "start", textX: 215, textY: 200 },
  { name: "六本木", zone: "circular", nextDistance: 0.8, cx: 200, cy: 240, textAnchor: "start", textX: 215, textY: 240 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.0, cx: 200, cy: 280, textAnchor: "start", textX: 215, textY: 280 },
  { name: "赤羽橋", zone: "circular", nextDistance: 0.8, cx: 200, cy: 320, textAnchor: "start", textX: 215, textY: 320 },
  { name: "大門", zone: "circular", nextDistance: 0.9, cx: 200, cy: 360, textAnchor: "start", textX: 215, textY: 360 },
  { name: "汐留", zone: "circular", nextDistance: 0.8, cx: 200, cy: 400, textAnchor: "start", textX: 215, textY: 400 },
  { name: "築地市場", zone: "circular", nextDistance: 0.9, cx: 200, cy: 440, textAnchor: "start", textX: 215, textY: 440 },
  { name: "勝どき", zone: "circular", nextDistance: 0.9, cx: 200, cy: 480, textAnchor: "start", textX: 215, textY: 480 },
  
  // 下部横線
  { name: "月島", zone: "circular", nextDistance: 0.8, cx: 160, cy: 520, textAnchor: "middle", textX: 160, textY: 535 },
  
  // 左側縦線 (下から上へ)
  { name: "門前仲町", zone: "circular", nextDistance: 1.1, cx: 120, cy: 480, textAnchor: "end", textX: 105, textY: 480 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.0, cx: 120, cy: 440, textAnchor: "end", textX: 105, textY: 440 },
  { name: "森下", zone: "circular", nextDistance: 0.9, cx: 120, cy: 400, textAnchor: "end", textX: 105, textY: 400 },
  { name: "両国", zone: "circular", nextDistance: 0.8, cx: 120, cy: 360, textAnchor: "end", textX: 105, textY: 360 },
  { name: "蔵前", zone: "circular", nextDistance: 0.8, cx: 120, cy: 320, textAnchor: "end", textX: 105, textY: 320 },
  { name: "新御徒町", zone: "circular", nextDistance: 0.9, cx: 120, cy: 280, textAnchor: "end", textX: 105, textY: 280 },
  { name: "上野御徒町", zone: "circular", nextDistance: 1.0, cx: 120, cy: 240, textAnchor: "end", textX: 105, textY: 240 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.1, cx: 120, cy: 200, textAnchor: "end", textX: 105, textY: 200 },
  { name: "春日", zone: "circular", nextDistance: 0.9, cx: 120, cy: 160, textAnchor: "end", textX: 105, textY: 160 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.2, cx: 120, cy: 120, textAnchor: "end", textX: 105, textY: 120 },
  
  // 都庁前に戻る (最後の都庁前は実際には表示しない)
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 80, cy: 80, textAnchor: "end", textX: 65, textY: 80 }
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
