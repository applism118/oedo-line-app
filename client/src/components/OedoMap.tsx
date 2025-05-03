import { useState, useEffect, useMemo } from "react";
import { linearStations, circularStations, allStations, findStation } from "@/lib/stations";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Direction } from "@shared/schema";

interface OedoMapProps {
  selectedFromStation: string | null;
  selectedToStation: string | null;
  direction: Direction;
  onStationClick: (stationName: string) => void;
}

type MapView = "linear" | "circular";

const OedoMap: React.FC<OedoMapProps> = ({ 
  selectedFromStation, 
  selectedToStation, 
  direction,
  onStationClick 
}) => {
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<MapView>("linear");
  const isMobile = useIsMobile();

  // 選択された2駅間の経路を計算する関数
  const calculateRouteBetweenStations = (from: string, to: string) => {
    // 直線ゾーンの場合
    const fromLinearIdx = linearStations.findIndex(s => s.name === from);
    const toLinearIdx = linearStations.findIndex(s => s.name === to);
    
    // 環状線ゾーンの場合
    const fromCircularIdx = circularStations.findIndex(s => s.name === from);
    const toCircularIdx = circularStations.findIndex(s => s.name === to);
    
    // 直線ゾーン内での移動
    if (fromLinearIdx !== -1 && toLinearIdx !== -1) {
      const startIdx = Math.min(fromLinearIdx, toLinearIdx);
      const endIdx = Math.max(fromLinearIdx, toLinearIdx);
      return linearStations.slice(startIdx, endIdx + 1).map(s => s.name);
    }
    
    // 環状線ゾーン内での移動
    if (fromCircularIdx !== -1 && toCircularIdx !== -1) {
      const stations = [];
      // 時計回り
      if (direction === "clockwise") {
        if (fromCircularIdx <= toCircularIdx) {
          // 順方向
          for (let i = fromCircularIdx; i <= toCircularIdx; i++) {
            stations.push(circularStations[i].name);
          }
        } else {
          // 環状線を一周する
          for (let i = fromCircularIdx; i < circularStations.length; i++) {
            stations.push(circularStations[i].name);
          }
          for (let i = 0; i <= toCircularIdx; i++) {
            stations.push(circularStations[i].name);
          }
        }
      } else {
        // 反時計回り
        if (fromCircularIdx >= toCircularIdx) {
          // 逆方向
          for (let i = fromCircularIdx; i >= toCircularIdx; i--) {
            stations.push(circularStations[i].name);
          }
        } else {
          // 環状線を一周する
          for (let i = fromCircularIdx; i >= 0; i--) {
            stations.push(circularStations[i].name);
          }
          for (let i = circularStations.length - 1; i >= toCircularIdx; i--) {
            stations.push(circularStations[i].name);
          }
        }
      }
      return stations;
    }
    
    // 直線ゾーンから環状線ゾーンへの移動 (都庁前駅経由)
    if (fromLinearIdx !== -1 && toCircularIdx !== -1) {
      const linearPart = linearStations.slice(fromLinearIdx, linearStations.length).map(s => s.name);
      const tochomaeIdx = circularStations.findIndex(s => s.name === "都庁前");
      
      const circularPart = [];
      // 時計回り
      if (direction === "clockwise") {
        if (tochomaeIdx <= toCircularIdx) {
          for (let i = tochomaeIdx; i <= toCircularIdx; i++) {
            circularPart.push(circularStations[i].name);
          }
        } else {
          for (let i = tochomaeIdx; i < circularStations.length; i++) {
            circularPart.push(circularStations[i].name);
          }
          for (let i = 0; i <= toCircularIdx; i++) {
            circularPart.push(circularStations[i].name);
          }
        }
      } else {
        // 反時計回り
        if (tochomaeIdx >= toCircularIdx) {
          for (let i = tochomaeIdx; i >= toCircularIdx; i--) {
            circularPart.push(circularStations[i].name);
          }
        } else {
          for (let i = tochomaeIdx; i >= 0; i--) {
            circularPart.push(circularStations[i].name);
          }
          for (let i = circularStations.length - 1; i >= toCircularIdx; i--) {
            circularPart.push(circularStations[i].name);
          }
        }
      }
      
      // 重複を除外 (都庁前駅が両方に含まれる)
      return [...linearPart, ...circularPart.slice(1)];
    }
    
    // 環状線ゾーンから直線ゾーンへの移動 (都庁前駅経由)
    if (fromCircularIdx !== -1 && toLinearIdx !== -1) {
      const tochomaeIdx = circularStations.findIndex(s => s.name === "都庁前");
      
      const circularPart = [];
      // 時計回り
      if (direction === "clockwise") {
        if (fromCircularIdx <= tochomaeIdx) {
          for (let i = fromCircularIdx; i <= tochomaeIdx; i++) {
            circularPart.push(circularStations[i].name);
          }
        } else {
          for (let i = fromCircularIdx; i < circularStations.length; i++) {
            circularPart.push(circularStations[i].name);
          }
          for (let i = 0; i <= tochomaeIdx; i++) {
            circularPart.push(circularStations[i].name);
          }
        }
      } else {
        // 反時計回り
        if (fromCircularIdx >= tochomaeIdx) {
          for (let i = fromCircularIdx; i >= tochomaeIdx; i--) {
            circularPart.push(circularStations[i].name);
          }
        } else {
          for (let i = fromCircularIdx; i >= 0; i--) {
            circularPart.push(circularStations[i].name);
          }
          for (let i = circularStations.length - 1; i >= tochomaeIdx; i--) {
            circularPart.push(circularStations[i].name);
          }
        }
      }
      
      const linearIdx = linearStations.findIndex(s => s.name === "都庁前");
      const linearPart = linearStations.slice(linearIdx, toLinearIdx + 1).map(s => s.name);
      
      return [...circularPart, ...linearPart.slice(1)];
    }
    
    return [from, to];
  };

  // Calculate the selected route when departure and destination are both selected
  useEffect(() => {
    if (selectedFromStation && selectedToStation) {
      // 選択された2駅間の経路を計算
      const routeStations = calculateRouteBetweenStations(selectedFromStation, selectedToStation);
      setSelectedRoute(routeStations);

      // 自動的に適切なビューに切り替える
      const fromLinearIdx = linearStations.findIndex(s => s.name === selectedFromStation);
      const fromCircularIdx = circularStations.findIndex(s => s.name === selectedFromStation);
      const toLinearIdx = linearStations.findIndex(s => s.name === selectedToStation);
      const toCircularIdx = circularStations.findIndex(s => s.name === selectedToStation);
      
      if (fromLinearIdx !== -1 && toLinearIdx !== -1) {
        setActiveView("linear");
      } else if (fromCircularIdx !== -1 && toCircularIdx !== -1) {
        setActiveView("circular");
      } else if (fromLinearIdx !== -1 && toCircularIdx !== -1) {
        // 直線→環状線は、直線ビューを表示
        setActiveView("linear");
      } else if (fromCircularIdx !== -1 && toLinearIdx !== -1) {
        // 環状線→直線は、環状線ビューを表示
        setActiveView("circular");
      }
    } else {
      setSelectedRoute([]);
    }
  }, [selectedFromStation, selectedToStation, direction]);

  // SVG dimensions and viewBox for responsive display
  const svgWidth = 300;
  const svgHeight = 650;
  // 添付画像のように縦長のレイアウトになるようにviewBoxを設定
  const linearViewBox = "0 0 280 650";
  const circularViewBox = "0 0 280 650";
  const viewBox = activeView === "linear" ? linearViewBox : circularViewBox;

  // Theme color for Oedo Line
  const oedoLineColor = "#b6007a";

  // Toggle between linear and circular views
  const toggleView = () => {
    setActiveView(prev => prev === "linear" ? "circular" : "linear");
  };

  return (
    <div className="space-y-4">
      {/* View Toggle Buttons */}
      <div className="flex justify-center space-x-2 mb-2 w-full px-2">
        <Button 
          variant={activeView === "linear" ? "default" : "outline"}
          onClick={() => setActiveView("linear")}
          className="px-2 py-2 rounded-full text-base whitespace-nowrap"
          style={{ backgroundColor: activeView === "linear" ? oedoLineColor : 'white', color: activeView === "linear" ? 'white' : oedoLineColor, borderColor: oedoLineColor, minWidth: '45%' }}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          直線ゾーン
        </Button>
        <Button 
          variant={activeView === "circular" ? "default" : "outline"}
          onClick={() => setActiveView("circular")}
          className="px-2 py-2 rounded-full text-base whitespace-nowrap"
          style={{ backgroundColor: activeView === "circular" ? oedoLineColor : 'white', color: activeView === "circular" ? 'white' : oedoLineColor, borderColor: oedoLineColor, minWidth: '45%' }}
        >
          環状線ゾーン
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Map View Container */}
      <div className="overflow-x-auto">
        <div className={`line-map relative max-w-full mx-auto`}>
          <svg 
            width="100%" 
            height={isMobile ? svgHeight * 0.8 : svgHeight} 
            viewBox={viewBox} 
            className="mx-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Zone label */}
            <text 
              x="140" 
              y="35" 
              className="text-xl font-bold" 
              textAnchor="middle" 
              fill={oedoLineColor}
            >
              {activeView === "linear" ? "直線ゾーン (光が丘 → 都庁前)" : "環状線ゾーン"}
            </text>
            
            {/* Linear Path - Only show in linear view */}
            {activeView === "linear" && (
              <path
                d={linearStations.map((station, i) => 
                  i === 0 ? `M ${station.cx} ${station.cy}` : `L ${station.cx} ${station.cy}`
                ).join(' ')}
                stroke={oedoLineColor}
                strokeWidth="5"
                fill="none"
              />
            )}
            
            {/* Rectangular Path for Circular zone - 縦長長方形に変更 */}
            {activeView === "circular" && (
              <path
                d="M 80 80 L 140 80 L 200 120 L 200 480 L 160 520 L 120 480 L 120 120 L 80 80 Z"
                stroke={oedoLineColor}
                strokeWidth="5"
                fill="none"
              />
            )}
            
            {/* Linear Stations - Only show when in linear view */}
            {activeView === "linear" && linearStations.map((station, index) => (
              <g key={`linear-${station.name}-${index}`} onClick={() => onStationClick(station.name)}>
                <circle 
                  cx={station.cx} 
                  cy={station.cy} 
                  r={station.name === "都庁前" ? 10 : 8} 
                  className={`
                    ${station.name === selectedFromStation ? 'fill-blue-500' : 
                      station.name === selectedToStation ? 'fill-red-500' : 
                      selectedRoute.includes(station.name) ? 'fill-purple-400' : 'fill-white'} 
                    cursor-pointer
                  `}
                  stroke={oedoLineColor}
                  strokeWidth={station.name === "都庁前" ? 3 : 2}
                />
                <text 
                  x={station.textX} 
                  y={station.textY} 
                  className={`
                    text-lg md:text-xl
                    ${station.name === "都庁前" ? 'font-semibold' : 'font-medium'} 
                    cursor-pointer
                  `} 
                  textAnchor={station.textAnchor}
                  // 傾きと位置移動は不要 - textAnchorとtextXYで位置調整
                >
                  {station.name}
                </text>
              </g>
            ))}
            
            {/* Circular Stations - Only show when in circular view */}
            {activeView === "circular" && circularStations.map((station, index) => {
              // 都庁前駅が重複して表示されるため、重複する場合はスキップする
              if (index > 0 && station.name === "都庁前" && activeView === "circular") {
                return null;
              }
              
              return (
                <g key={`circular-${station.name}-${index}`} onClick={() => onStationClick(station.name)}>
                  <circle 
                    cx={station.cx} 
                    cy={station.cy} 
                    r={station.name === "都庁前" ? 10 : 8} 
                    className={`
                      ${station.name === selectedFromStation ? 'fill-blue-500' : 
                        station.name === selectedToStation ? 'fill-red-500' : 
                        selectedRoute.includes(station.name) ? 'fill-purple-400' : 'fill-white'} 
                      cursor-pointer
                    `}
                    stroke={oedoLineColor}
                    strokeWidth={station.name === "都庁前" ? 3 : 2}
                  />
                  <text 
                    x={station.textX} 
                    y={station.textY} 
                    className="text-lg md:text-xl font-medium cursor-pointer" 
                    textAnchor={station.textAnchor}
                    // 駅名の傾きや位置移動は使わず、textAnchorとtextXYで位置調整
                  >
                    {station.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Instructions for tab switching */}
      <div className="bg-gray-50 p-2 rounded-lg text-sm text-center">
        <p className="text-xs text-gray-500">タブをクリックして路線図を切り替えられます</p>
      </div>
    </div>
  );
};

export default OedoMap;
