import { useState, useEffect } from "react";
import { linearStations, circularStations } from "@/lib/stations";

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

  return (
    <div className="overflow-x-auto">
      <div className="line-map min-w-[700px] h-[500px] relative">
        <svg width="700" height="500" viewBox="0 0 700 500" className="mx-auto">
          {/* Linear Section */}
          <path 
            d="M140,80 L350,200" 
            className="stroke-[#1e6738] stroke-4" 
            strokeLinecap="round"
          />
          <text 
            x="245" 
            y="120" 
            className="text-xs" 
            textAnchor="middle" 
            fill="#1f2937"
          >
            直線ゾーン
          </text>
          
          {/* Circular Section */}
          <path 
            d="M350,200 Q500,100 600,220 Q650,350 550,450 Q450,500 300,480 Q200,450 180,350 Q150,250 350,200" 
            className="stroke-[#1e6738] stroke-4 fill-none" 
            strokeLinecap="round"
          />
          <text 
            x="400" 
            y="350" 
            className="text-xs" 
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
                  ${station.name === "都庁前" ? 'font-bold' : ''} 
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
