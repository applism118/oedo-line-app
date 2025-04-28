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
  
  // Calculate linear path
  const linearStartX = linearStations[0].cx;
  const linearStartY = linearStations[0].cy;
  const linearEndX = linearStations[linearStations.length - 1].cx;
  const linearEndY = linearStations[linearStations.length - 1].cy;
  const linearPath = `M${linearStartX},${linearStartY} `;
  
  // Create path for linear section (smooth line through all points)
  const linearPathPoints = linearStations.map(station => `${station.cx},${station.cy}`).join(" ");
  
  // Create rounded rectangle path for circular section
  const getRoundedRectPath = () => {
    // Calculate points for rounded rect
    const startX = circularStations[0].cx;
    const startY = circularStations[0].cy;
    const width = 200;
    const height = 190;
    const radius = 80;
    
    return `
      M${startX},${startY}
      L${startX + width - radius},${startY}
      Q${startX + width},${startY} ${startX + width},${startY + radius}
      L${startX + width},${startY + height - radius}
      Q${startX + width},${startY + height} ${startX + width - radius},${startY + height}
      L${startX - width + radius},${startY + height}
      Q${startX - width},${startY + height} ${startX - width},${startY + height - radius}
      L${startX - width},${startY + radius}
      Q${startX - width},${startY} ${startX - width + radius},${startY}
      L${startX},${startY}
    `;
  };

  return (
    <div className="overflow-x-auto">
      <div className={`line-map relative ${isMobile ? 'min-w-[680px]' : ''} max-w-full mx-auto`}>
        <svg width="100%" height={svgHeight} viewBox={viewBox} className="mx-auto">
          {/* Linear Section */}
          <polyline 
            points={linearPathPoints}
            className="stroke-[#1e6738] stroke-4 fill-none" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text 
            x="160" 
            y="80" 
            className="text-xs font-medium" 
            textAnchor="middle" 
            fill="#1f2937"
          >
            直線ゾーン
          </text>
          
          {/* Circular Section - Using rounded rectangle */}
          <path 
            d={getRoundedRectPath()}
            className="stroke-[#1e6738] stroke-4 fill-none" 
            strokeLinecap="round"
          />
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
