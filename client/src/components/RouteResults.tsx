import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RouteResult } from "@shared/schema";
import { walkingSpeeds } from "@/lib/stations";
import { calculateTotalTime } from "@/lib/routeCalculator";
import StationTimeline from "./StationTimeline";

interface RouteResultsProps {
  routes: {
    slow: RouteResult | null;
    normal: RouteResult | null;
    fast: RouteResult | null;
  };
  onSavePlan: (speedId: string) => void;
}

const RouteResults: React.FC<RouteResultsProps> = ({ routes, onSavePlan }) => {
  const [activeTab, setActiveTab] = useState<string>("slow");
  
  if (!routes.slow && !routes.normal && !routes.fast) {
    return null;
  }

  // Get the current active route
  const activeRoute = routes[activeTab as keyof typeof routes];
  if (!activeRoute) return null;

  // Find the walking speed details
  const speedDetails = walkingSpeeds.find(s => s.id === activeTab);
  if (!speedDetails) return null;

  // Calculate total time
  const totalTimeHours = calculateTotalTime(activeRoute);

  return (
    <section className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">ルート結果</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-200 mb-4 w-full justify-start">
          {walkingSpeeds.map(speed => (
            <TabsTrigger 
              key={speed.id}
              value={speed.id}
              disabled={!routes[speed.id as keyof typeof routes]}
              className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#1e6738] data-[state=active]:text-[#1e6738] data-[state=active]:font-medium"
            >
              {speed.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {walkingSpeeds.map(speed => (
          <TabsContent key={speed.id} value={speed.id}>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">歩行速度</p>
                <p className="font-semibold">{speed.label}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">総距離</p>
                <p className="font-semibold">
                  {routes[speed.id as keyof typeof routes]?.totalDistance.toFixed(1)} km
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">予想所要時間</p>
                <p className="font-semibold">
                  {totalTimeHours.toFixed(1)} 時間
                </p>
              </div>
            </div>
            
            {routes[speed.id as keyof typeof routes] && (
              <StationTimeline 
                stations={routes[speed.id as keyof typeof routes]!.stations} 
              />
            )}
            
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => onSavePlan(speed.id)}
                className="px-4 py-2 bg-[#1e6738] text-white rounded-md hover:bg-[#0b4523] transition-colors"
              >
                プランを保存
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RouteResults;
