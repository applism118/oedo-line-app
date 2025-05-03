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

// 環状線ゾーン - 長方形に配置（指定順序で時計回り）- 駅間隔を均等に
export const circularStations: OedoStation[] = [
  // 上部 - 長方形の上辺（都庁前〜本郷三丁目）
  { name: "都庁前", zone: "circular", nextDistance: 0.67, cx: 90, cy: 60, textAnchor: "middle", textX: 90, textY: 45 },
  { name: "新宿西口", zone: "circular", nextDistance: 1.73, cx: 120, cy: 60, textAnchor: "middle", textX: 120, textY: 45 },
  { name: "東新宿", zone: "circular", nextDistance: 1.33, cx: 150, cy: 60, textAnchor: "middle", textX: 150, textY: 45 },
  { name: "若松河田", zone: "circular", nextDistance: 1.07, cx: 180, cy: 60, textAnchor: "middle", textX: 180, textY: 45 },
  { name: "牛込柳町", zone: "circular", nextDistance: 1.20, cx: 210, cy: 60, textAnchor: "middle", textX: 210, textY: 45 },
  { name: "牛込神楽坂", zone: "circular", nextDistance: 1.07, cx: 240, cy: 60, textAnchor: "middle", textX: 240, textY: 45 },
  
  // 右側 - 長方形の右辺（飯田橋〜森下）
  { name: "飯田橋", zone: "circular", nextDistance: 1.87, cx: 240, cy: 90, textAnchor: "start", textX: 255, textY: 90 },
  { name: "春日", zone: "circular", nextDistance: 0.93, cx: 240, cy: 120, textAnchor: "start", textX: 255, textY: 120 },
  { name: "本郷三丁目", zone: "circular", nextDistance: 1.73, cx: 240, cy: 150, textAnchor: "start", textX: 255, textY: 150 },
  { name: "上野御徒町", zone: "circular", nextDistance: 0.80, cx: 240, cy: 180, textAnchor: "start", textX: 255, textY: 180 },
  { name: "新御徒町", zone: "circular", nextDistance: 1.20, cx: 240, cy: 210, textAnchor: "start", textX: 255, textY: 210 },
  { name: "蔵前", zone: "circular", nextDistance: 1.47, cx: 240, cy: 240, textAnchor: "start", textX: 255, textY: 240 },
  { name: "両国", zone: "circular", nextDistance: 1.20, cx: 240, cy: 270, textAnchor: "start", textX: 255, textY: 270 },
  { name: "森下", zone: "circular", nextDistance: 1.07, cx: 240, cy: 300, textAnchor: "start", textX: 255, textY: 300 },
  
  // 下部 - 長方形の下辺（清澄白河〜赤羽橋）
  { name: "清澄白河", zone: "circular", nextDistance: 1.33, cx: 210, cy: 300, textAnchor: "middle", textX: 210, textY: 315 },
  { name: "門前仲町", zone: "circular", nextDistance: 1.60, cx: 180, cy: 300, textAnchor: "middle", textX: 180, textY: 315 },
  { name: "月島", zone: "circular", nextDistance: 1.33, cx: 150, cy: 300, textAnchor: "middle", textX: 150, textY: 315 },
  { name: "勝どき", zone: "circular", nextDistance: 1.47, cx: 120, cy: 300, textAnchor: "middle", textX: 120, textY: 315 },
  { name: "築地市場", zone: "circular", nextDistance: 0.93, cx: 90, cy: 300, textAnchor: "middle", textX: 90, textY: 315 },
  { name: "汐留", zone: "circular", nextDistance: 1.07, cx: 60, cy: 300, textAnchor: "middle", textX: 60, textY: 315 },
  
  // 左側 - 長方形の左辺（大門〜新宿）
  { name: "大門", zone: "circular", nextDistance: 1.60, cx: 60, cy: 270, textAnchor: "end", textX: 45, textY: 270 },
  { name: "赤羽橋", zone: "circular", nextDistance: 1.20, cx: 60, cy: 240, textAnchor: "end", textX: 45, textY: 240 },
  { name: "麻布十番", zone: "circular", nextDistance: 1.20, cx: 60, cy: 210, textAnchor: "end", textX: 45, textY: 210 },
  { name: "六本木", zone: "circular", nextDistance: 1.73, cx: 60, cy: 180, textAnchor: "end", textX: 45, textY: 180 },
  { name: "青山一丁目", zone: "circular", nextDistance: 1.33, cx: 60, cy: 150, textAnchor: "end", textX: 45, textY: 150 },
  { name: "国立競技場", zone: "circular", nextDistance: 1.60, cx: 60, cy: 120, textAnchor: "end", textX: 45, textY: 120 },
  { name: "代々木", zone: "circular", nextDistance: 1.33, cx: 60, cy: 90, textAnchor: "end", textX: 45, textY: 90 },
  { name: "新宿", zone: "circular", nextDistance: 0.93, cx: 60, cy: 60, textAnchor: "middle", textX: 60, textY: 45 },
  
  // 都庁前に戻る (最後の都庁前は実際には表示しない)
  { name: "都庁前", zone: "circular", nextDistance: 0.0, cx: 90, cy: 60, textAnchor: "middle", textX: 90, textY: 45 }
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
