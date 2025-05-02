import { useState, useEffect } from "react";
import { linearStations, circularStations } from "@/lib/stations";
import { useIsMobile } from "@/hooks/use-mobile";

interface OedoMapProps {
  selectedFromStation: string | null;
  selectedToStation: string | null;
  onStationClick: (stationName: string) => void;
}

const OedoMap: React.FC<OedoMapProps> = ({ 
  selectedFromStation, 
  selectedToStation, 
  onStationClick 
}) => {
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
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
    } else {
      setSelectedRoute([]);
    }
  }, [selectedFromStation, selectedToStation]);

  // SVG dimensions and viewBox
  const svgWidth = 680;
  const svgHeight = 550;
  const viewBox = `0 0 ${svgWidth} ${svgHeight}`;

  return (
    <div className="overflow-x-auto">
      <div className={`line-map relative ${isMobile ? 'min-w-[680px]' : ''} max-w-full mx-auto`}>
        <svg width="100%" height={svgHeight} viewBox={viewBox} className="mx-auto">
          {/* Zone labels */}
          <text 
            x="160" 
            y="80" 
            className="text-xs font-medium" 
            textAnchor="middle" 
            fill="#1f2937"
          >
            直線ゾーン
          </text>
          
          <text 
            x="480" 
            y="400" 
            className="text-xs font-medium" 
            textAnchor="middle" 
            fill="#1f2937"
          >
            環状線ゾーン
          </text>
          
          {/* Linear Stations */}
          {linearStations.map((station) => (
            <g key={`linear-${station.name}`} onClick={() => onStationClick(station.name)}>
              <circle 
                cx={station.cx} 
                cy={station.cy} 
                r={station.name === "都庁前" ? 8 : 6} 
                className={`
                  ${station.name === selectedFromStation ? 'fill-blue-500' : 
                    station.name === selectedToStation ? 'fill-red-500' : 'fill-white'} 
                  ${station.name === "都庁前" ? 'stroke-[#1e6738] stroke-3' : 'stroke-[#1e6738] stroke-2'}
                  cursor-pointer
                `}
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
              >
                {station.name}
              </text>
            </g>
          ))}
          
          {/* Circular Stations (excluding the duplicate Tocho-mae at the end) */}
          {circularStations.slice(1, -1).map((station) => (
            <g key={`circular-${station.name}`} onClick={() => onStationClick(station.name)}>
              <circle 
                cx={station.cx} 
                cy={station.cy} 
                r={6} 
                className={`
                  ${station.name === selectedFromStation ? 'fill-blue-500' : 
                    station.name === selectedToStation ? 'fill-red-500' : 'fill-white'} 
                  stroke-[#1e6738] stroke-2
                  cursor-pointer
                `}
              />
              <text 
                x={station.textX} 
                y={station.textY} 
                className="text-xs cursor-pointer" 
                textAnchor={station.textAnchor}
              >
                {station.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default OedoMap;
