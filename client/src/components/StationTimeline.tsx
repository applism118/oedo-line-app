import { RouteStation } from "@shared/schema";
import { formatTime } from "@/lib/routeCalculator";
import { findStation } from "@/lib/stations";

interface StationTimelineProps {
  stations: RouteStation[];
}

const StationTimeline: React.FC<StationTimelineProps> = ({ stations }) => {
  // 大江戸線テーマカラー
  const oedoLineColor = "#b6007a";
  
  // 距離に基づいて線の濃さを計算
  const getLineOpacity = (stationName: string, nextStationName: string) => {
    const station = findStation(stationName);
    if (!station) return 0.7; // デフォルト
    
    // 距離に基づいて濃淡を調整 (0.2-1.0の範囲) - より明確な差をつける
    const distance = station.nextDistance || 1.0;
    return Math.min(0.2 + (distance - 0.7) * 0.6, 1.0);
  };

  // Get station marker type
  const getMarkerType = (station: RouteStation, index: number, isLast: boolean) => {
    if (index === 0) return { type: "start", label: "S", className: "bg-blue-500" };
    if (isLast) return { type: "end", label: "E", className: "bg-red-500" };
    if (station.isRestStation) return { type: "rest", label: "R", className: "bg-orange-500" };
    return { type: "normal", label: "", className: "bg-gray-200 text-gray-600" };
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">タイムライン</h3>
      <div className="space-y-6">
        {stations.map((station, index) => {
          const isLast = index === stations.length - 1;
          const marker = getMarkerType(station, index, isLast);
          const nextStation = !isLast ? stations[index + 1] : null;
          const lineOpacity = nextStation ? getLineOpacity(station.name, nextStation.name) : 1.0;
          
          return (
            <div className="flex" key={`${station.name}-${index}`}>
              <div className="relative">
                <div className={`h-6 w-6 rounded-full ${marker.className} flex items-center justify-center text-white text-xs`}>
                  {marker.label}
                </div>
                {!isLast && (
                  <div 
                    className="absolute top-6 bottom-0 left-3 w-2" 
                    style={{ 
                      backgroundColor: oedoLineColor, 
                      opacity: lineOpacity 
                    }}
                  ></div>
                )}
              </div>
              <div className="ml-4">
                <div className="font-medium">{station.name}</div>
                <div className="text-sm text-gray-500">到着: {formatTime(station.arrivalTime)}</div>
                {station.isRestStation && station.departureTime && (
                  <div className="text-sm text-orange-600">
                    休憩後出発: {formatTime(station.departureTime)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationTimeline;
