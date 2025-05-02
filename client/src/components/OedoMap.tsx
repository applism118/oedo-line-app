import { useState, useEffect } from "react";
import { linearStations, circularStations } from "@/lib/stations";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface OedoMapProps {
  selectedFromStation: string | null;
  selectedToStation: string | null;
  onStationClick: (stationName: string) => void;
}

type MapView = "linear" | "circular";

const OedoMap: React.FC<OedoMapProps> = ({ 
  selectedFromStation, 
  selectedToStation, 
  onStationClick 
}) => {
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<MapView>("linear");
  const isMobile = useIsMobile();

  // Calculate the selected route when departure and destination are both selected
  useEffect(() => {
    if (selectedFromStation && selectedToStation) {
      // This is a simplified version - in a real app, we'd calculate the actual route
      // between the stations based on the direction
      const fromLinearIdx = linearStations.findIndex(s => s.name === selectedFromStation);
      const fromCircularIdx = circularStations.findIndex(s => s.name === selectedFromStation);
      const toLinearIdx = linearStations.findIndex(s => s.name === selectedToStation);
      const toCircularIdx = circularStations.findIndex(s => s.name === selectedToStation);
      
      const stations: string[] = [];
      
      // Just for highlighting purposes - this doesn't calculate the full path
      if (selectedFromStation) stations.push(selectedFromStation);
      if (selectedToStation) stations.push(selectedToStation);
      
      setSelectedRoute(stations);

      // Auto switch to the appropriate view based on selected stations
      if (fromLinearIdx !== -1 && toLinearIdx !== -1) {
        setActiveView("linear");
      } else if (fromCircularIdx !== -1 && toCircularIdx !== -1) {
        setActiveView("circular");
      } else if (fromLinearIdx !== -1 && toCircularIdx !== -1) {
        // If from linear to circular, show linear first
        setActiveView("linear");
      } else if (fromCircularIdx !== -1 && toLinearIdx !== -1) {
        // If from circular to linear, show circular first
        setActiveView("circular");
      }
    } else {
      setSelectedRoute([]);
    }
  }, [selectedFromStation, selectedToStation]);

  // SVG dimensions and viewBox
  const svgWidth = 1150;
  const svgHeight = 650;
  const linearViewBox = "20 20 350 350";
  const circularViewBox = "0 0 1150 650"; // 新しい環状線に合わせたviewBox
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
      <div className="flex justify-center space-x-2 mb-2">
        <Button 
          variant={activeView === "linear" ? "default" : "outline"}
          onClick={() => setActiveView("linear")}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: activeView === "linear" ? oedoLineColor : 'white', color: activeView === "linear" ? 'white' : oedoLineColor, borderColor: oedoLineColor }}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          直線ゾーン
        </Button>
        <Button 
          variant={activeView === "circular" ? "default" : "outline"}
          onClick={() => setActiveView("circular")}
          className="px-4 py-2 rounded-full"
          style={{ backgroundColor: activeView === "circular" ? oedoLineColor : 'white', color: activeView === "circular" ? 'white' : oedoLineColor, borderColor: oedoLineColor }}
        >
          環状線ゾーン
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Map View Container */}
      <div className="overflow-x-auto">
        <div className={`line-map relative ${isMobile ? 'min-w-[1150px]' : ''} max-w-full mx-auto`}>
          <svg width="100%" height={svgHeight} viewBox={viewBox} className="mx-auto">
            {/* Zone label */}
            <text 
              x={activeView === "linear" ? "240" : "570"} 
              y={activeView === "linear" ? "50" : "50"} 
              className="text-lg font-medium" 
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
                strokeWidth="4"
                fill="none"
              />
            )}
            
            {/* Rectangular Path for Circular zone - Only show in circular view */}
            {activeView === "circular" && (
              <path
                d="M 80 550 L 1060 550 L 1060 100 L 80 100 L 80 550 Z"
                stroke={oedoLineColor}
                strokeWidth="4"
                fill="none"
              />
            )}
            
            {/* Linear Stations - Only show when in linear view */}
            {activeView === "linear" && linearStations.map((station, index) => (
              <g key={`linear-${station.name}-${index}`} onClick={() => onStationClick(station.name)}>
                <circle 
                  cx={station.cx} 
                  cy={station.cy} 
                  r={station.name === "都庁前" ? 8 : 6} 
                  className={`
                    ${station.name === selectedFromStation ? 'fill-blue-500' : 
                      station.name === selectedToStation ? 'fill-red-500' : 'fill-white'} 
                    cursor-pointer
                  `}
                  stroke={oedoLineColor}
                  strokeWidth={station.name === "都庁前" ? 3 : 2}
                />
                <text 
                  x={station.textX} 
                  y={station.textY} 
                  className={`
                    text-xs 
                    ${station.name === "都庁前" ? 'font-semibold' : ''} 
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
            {activeView === "circular" && circularStations.map((station, index) => (
              <g key={`circular-${station.name}-${index}`} onClick={() => onStationClick(station.name)}>
                <circle 
                  cx={station.cx} 
                  cy={station.cy} 
                  r={station.name === "都庁前" ? 8 : 6} 
                  className={`
                    ${station.name === selectedFromStation ? 'fill-blue-500' : 
                      station.name === selectedToStation ? 'fill-red-500' : 'fill-white'} 
                    cursor-pointer
                  `}
                  stroke={oedoLineColor}
                  strokeWidth={station.name === "都庁前" ? 3 : 2}
                />
                <text 
                  x={station.textX} 
                  y={station.textY} 
                  className="text-xs cursor-pointer" 
                  textAnchor={station.textAnchor}
                  // 駅名の傾きや位置移動は使わず、textAnchorとtextXYで位置調整
                >
                  {station.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 p-2 rounded-lg text-sm text-center">
        <p>
          <span className="inline-flex items-center">
            <span className="bg-blue-500 h-3 w-3 inline-block rounded-full mr-1"></span>
            出発駅
          </span>
          <span className="mx-2">|</span>
          <span className="inline-flex items-center">
            <span className="bg-red-500 h-3 w-3 inline-block rounded-full mr-1"></span>
            到着駅
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">タブをクリックして路線図を切り替えられます</p>
      </div>
    </div>
  );
};

export default OedoMap;
