import { RouteStation } from "@shared/schema";
import { formatTime } from "@/lib/routeCalculator";

interface StationTimelineProps {
  stations: RouteStation[];
}

const StationTimeline: React.FC<StationTimelineProps> = ({ stations }) => {
  // Generate color based on station index and distance
  const getGradientColor = (index: number, totalStations: number) => {
    if (index === 0) return "from-green-300 to-green-500";
    if (index === totalStations - 1) return "from-green-300 to-green-500";
    
    // Generate gradient colors based on position
    const intensity = Math.min(Math.floor(index / totalStations * 5) + 3, 7);
    return `from-green-${intensity - 1}00 to-green-${intensity}00`;
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
          const gradientColor = getGradientColor(index, stations.length);
          
          return (
            <div className="flex" key={`${station.name}-${index}`}>
              <div className="relative">
                <div className={`h-6 w-6 rounded-full ${marker.className} flex items-center justify-center text-white text-xs`}>
                  {marker.label}
                </div>
                {!isLast && (
                  <div className={`absolute top-6 bottom-0 left-3 w-0.5 bg-gradient-to-b ${gradientColor}`}></div>
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
