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

// 環状線ゾーン - 縦長楕円形に配置（添付画像参考）- 駅間隔を均等に
export const circularStations: OedoStation[] = [
  // 上部 - 楕円形の上部（新宿エリア）
  { name: "都庁前", zone: "circular", nextDistance: 0.67, cx: 160, cy: 80, textAnchor: "end", textX: 140, textY: 80 },
  
  // 右側縦線 - 環状線の右側縦線（代々木→勝どき）- 15駅を均等配置
  { name: "代々木", zone: "circular", nextDistance: 1.33, cx: 215, cy: 95, textAnchor: "start", textX: 235, textY: 95 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.60, cx: 215, cy: 110, textAnchor: "start", textX: 235, textY: 110 },
  { name: "青山一丁目", zone: "circular", nextDistance: 1.33, cx: 215, cy: 125, textAnchor: "start", textX: 235, textY: 125 },
  { name: "六本木", zone: "circular", nextDistance: 1.73, cx: 215, cy: 140, textAnchor: "start", textX: 235, textY: 140 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.20, cx: 215, cy: 155, textAnchor: "start", textX: 235, textY: 155 },
  { name: "赤羽橋", zone: "circular", nextDistance: 1.20, cx: 215, cy: 170, textAnchor: "start", textX: 235, textY: 170 },
  { name: "大門", zone: "circular", nextDistance: 1.60, cx: 215, cy: 185, textAnchor: "start", textX: 235, textY: 185 },
  { name: "汐留", zone: "circular", nextDistance: 1.07, cx: 215, cy: 200, textAnchor: "start", textX: 235, textY: 200 },
  { name: "築地市場", zone: "circular", nextDistance: 0.93, cx: 215, cy: 215, textAnchor: "start", textX: 235, textY: 215 },
  { name: "勝どき", zone: "circular", nextDistance: 1.47, cx: 215, cy: 230, textAnchor: "start", textX: 235, textY: 230 },
  { name: "月島", zone: "circular", nextDistance: 1.33, cx: 215, cy: 245, textAnchor: "start", textX: 235, textY: 245 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.60, cx: 215, cy: 260, textAnchor: "start", textX: 235, textY: 260 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.33, cx: 215, cy: 275, textAnchor: "start", textX: 235, textY: 275 },
  { name: "森下", zone: "circular", nextDistance: 1.07, cx: 215, cy: 290, textAnchor: "start", textX: 235, textY: 290 },
  { name: "両国", zone: "circular", nextDistance: 1.20, cx: 215, cy: 305, textAnchor: "start", textX: 235, textY: 305 },
  
  // 左側縦線 - 環状線の左側縦線（蔵前→飯田橋）- 15駅を均等配置
  { name: "蔵前", zone: "circular", nextDistance: 1.47, cx: 105, cy: 320, textAnchor: "end", textX: 85, textY: 320 },
  { name: "新御徒町", zone: "circular", nextDistance: 1.20, cx: 105, cy: 305, textAnchor: "end", textX: 85, textY: 305 },
  { name: "上野御徒町", zone: "circular", nextDistance: 0.80, cx: 105, cy: 290, textAnchor: "end", textX: 85, textY: 290 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.73, cx: 105, cy: 275, textAnchor: "end", textX: 85, textY: 275 },
  { name: "春日", zone: "circular", nextDistance: 0.93, cx: 105, cy: 260, textAnchor: "end", textX: 85, textY: 260 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.07, cx: 105, cy: 245, textAnchor: "end", textX: 85, textY: 245 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.20, cx: 105, cy: 230, textAnchor: "end", textX: 85, textY: 230 },
  { name: "牛込柳町", zone: "circular", nextDistance: 1.07, cx: 105, cy: 215, textAnchor: "end", textX: 85, textY: 215 },
  { name: "若松河田", zone: "circular", nextDistance: 1.47, cx: 105, cy: 200, textAnchor: "end", textX: 85, textY: 200 },
  { name: "東新宿", zone: "circular", nextDistance: 1.33, cx: 105, cy: 185, textAnchor: "end", textX: 85, textY: 185 },
  { name: "新宿西口", zone: "circular", nextDistance: 0.93, cx: 105, cy: 170, textAnchor: "end", textX: 85, textY: 170 },
  { name: "新宿", zone: "circular", nextDistance: 0.67, cx: 105, cy: 155, textAnchor: "end", textX: 85, textY: 155 },
  
  // 下部 - 楕円形の下部（月島）
  { name: "月島", zone: "circular", nextDistance: 1.60, cx: 160, cy: 330, textAnchor: "middle", textX: 160, textY: 345 },
  
  // 都庁前に戻る (最後の都庁前は実際には表示しない)
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 160, cy: 80, textAnchor: "end", textX: 140, textY: 80 }
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
