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

// 環状線ゾーン - 縦長楕円形に配置（添付画像参考）- 駅間隔を均等に、高さ1.5倍
export const circularStations: OedoStation[] = [
  // 上部 - 楕円形の上部（新宿エリア）
  { name: "都庁前", zone: "circular", nextDistance: 0.67, cx: 160, cy: 60, textAnchor: "end", textX: 140, textY: 60 },
  { name: "新宿", zone: "circular", nextDistance: 0.93, cx: 180, cy: 60, textAnchor: "start", textX: 200, textY: 60 },
  { name: "新宿西口", zone: "circular", nextDistance: 1.73, cx: 200, cy: 70, textAnchor: "start", textX: 220, textY: 70 },
  
  // 右側縦線 - 環状線の右側縦線（代々木→勝どき）- 14駅を均等配置
  { name: "代々木", zone: "circular", nextDistance: 1.33, cx: 220, cy: 90, textAnchor: "start", textX: 240, textY: 90 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.60, cx: 220, cy: 115, textAnchor: "start", textX: 240, textY: 115 },
  { name: "青山一丁目", zone: "circular", nextDistance: 1.33, cx: 220, cy: 140, textAnchor: "start", textX: 240, textY: 140 },
  { name: "六本木", zone: "circular", nextDistance: 1.73, cx: 220, cy: 165, textAnchor: "start", textX: 240, textY: 165 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.20, cx: 220, cy: 190, textAnchor: "start", textX: 240, textY: 190 },
  { name: "赤羽橋", zone: "circular", nextDistance: 1.20, cx: 220, cy: 215, textAnchor: "start", textX: 240, textY: 215 },
  { name: "大門", zone: "circular", nextDistance: 1.60, cx: 220, cy: 240, textAnchor: "start", textX: 240, textY: 240 },
  { name: "汐留", zone: "circular", nextDistance: 1.07, cx: 220, cy: 265, textAnchor: "start", textX: 240, textY: 265 },
  { name: "築地市場", zone: "circular", nextDistance: 0.93, cx: 220, cy: 290, textAnchor: "start", textX: 240, textY: 290 },
  { name: "勝どき", zone: "circular", nextDistance: 1.47, cx: 210, cy: 315, textAnchor: "start", textX: 230, textY: 315 },
  { name: "月島", zone: "circular", nextDistance: 1.33, cx: 190, cy: 335, textAnchor: "start", textX: 210, textY: 335 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.60, cx: 170, cy: 345, textAnchor: "start", textX: 190, textY: 345 },
  { name: "清澄白河", zone: "circular", nextDistance: 1.33, cx: 150, cy: 345, textAnchor: "start", textX: 170, textY: 345 },
  { name: "森下", zone: "circular", nextDistance: 1.07, cx: 130, cy: 335, textAnchor: "end", textX: 110, textY: 335 },
  
  // 左側縦線 - 環状線の左側縦線（両国→都庁前）- 11駅を均等配置
  { name: "両国", zone: "circular", nextDistance: 1.20, cx: 100, cy: 315, textAnchor: "end", textX: 80, textY: 315 },
  { name: "蔵前", zone: "circular", nextDistance: 1.47, cx: 100, cy: 290, textAnchor: "end", textX: 80, textY: 290 },
  { name: "新御徒町", zone: "circular", nextDistance: 1.20, cx: 100, cy: 265, textAnchor: "end", textX: 80, textY: 265 },
  { name: "上野御徒町", zone: "circular", nextDistance: 0.80, cx: 100, cy: 240, textAnchor: "end", textX: 80, textY: 240 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.73, cx: 100, cy: 215, textAnchor: "end", textX: 80, textY: 215 },
  { name: "春日", zone: "circular", nextDistance: 0.93, cx: 100, cy: 190, textAnchor: "end", textX: 80, textY: 190 },
  { name: "飯田橋", zone: "circular", nextDistance: 1.07, cx: 100, cy: 165, textAnchor: "end", textX: 80, textY: 165 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.20, cx: 100, cy: 140, textAnchor: "end", textX: 80, textY: 140 },
  { name: "牛込柳町", zone: "circular", nextDistance: 1.07, cx: 100, cy: 115, textAnchor: "end", textX: 80, textY: 115 },
  { name: "若松河田", zone: "circular", nextDistance: 1.47, cx: 100, cy: 90, textAnchor: "end", textX: 80, textY: 90 },
  { name: "東新宿", zone: "circular", nextDistance: 1.33, cx: 120, cy: 70, textAnchor: "end", textX: 100, textY: 70 },
  
  // 都庁前に戻る (最後の都庁前は実際には表示しない)
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 160, cy: 60, textAnchor: "end", textX: 140, textY: 60 }
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
