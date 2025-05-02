import { useState, useEffect } from "react";
import { Direction, RouteResult, SavedPlan, WalkingSpeed } from "@shared/schema";
import { calculateRoute } from "@/lib/routeCalculator";
import { savePlan, getSavedPlans, deletePlan, deleteAllPlans } from "@/lib/storage";
import { walkingSpeeds } from "@/lib/stations";
import { useToast } from "@/hooks/use-toast";
import RouteSelector from "@/components/RouteSelector";
import RouteResults from "@/components/RouteResults";
import SavedPlansDialog from "@/components/SavedPlansDialog";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

const HomePage = () => {
  const { toast } = useToast();

  // Station selection state
  const [fromStation, setFromStation] = useState<string | null>(null);
  const [toStation, setToStation] = useState<string | null>(null);
  
  // Route parameters
  const [direction, setDirection] = useState<Direction>("clockwise");
  const [startTime, setStartTime] = useState<string>(
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [restMinutes, setRestMinutes] = useState<number>(30);
  
  // Route calculation results
  const [routes, setRoutes] = useState<{
    slow: RouteResult | null;
    normal: RouteResult | null;
    fast: RouteResult | null;
  }>({
    slow: null,
    normal: null,
    fast: null
  });

  // Saved plans state
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [isSavedPlansDialogOpen, setIsSavedPlansDialogOpen] = useState<boolean>(false);

  // Load saved plans on initial render
  useEffect(() => {
    setSavedPlans(getSavedPlans());
  }, []);

  // Calculate routes when parameters change
  useEffect(() => {
    if (fromStation && toStation) {
      calculateRoutes();
    }
  }, [fromStation, toStation, direction, startTime, restMinutes]);

  // Convert time string to Date
  const getStartTimeAsDate = (): Date => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Calculate routes for all speeds
  const calculateRoutes = () => {
    if (!fromStation || !toStation) return;

    const startTimeDate = getStartTimeAsDate();
    const newRoutes = { slow: null, normal: null, fast: null } as {
      slow: RouteResult | null;
      normal: RouteResult | null;
      fast: RouteResult | null;
    };

    walkingSpeeds.forEach(speed => {
      try {
        const route = calculateRoute(
          fromStation,
          toStation,
          speed.value,
          startTimeDate,
          direction,
          restMinutes
        );
        newRoutes[speed.id as keyof typeof newRoutes] = route;
      } catch (error) {
        console.error(`Error calculating route for ${speed.id} speed:`, error);
      }
    });

    setRoutes(newRoutes);
  };

  // Handle save plan
  const handleSavePlan = (speedId: string) => {
    if (!fromStation || !toStation) return;

    const speedDetails = walkingSpeeds.find(s => s.id === speedId);
    if (!speedDetails) return;

    const route = routes[speedId as keyof typeof routes];
    if (!route) return;

    try {
      savePlan(
        fromStation,
        toStation,
        direction,
        speedId as WalkingSpeed,
        getStartTimeAsDate(),
        restMinutes,
        route.totalDistance,
        route.stations
      );

      // Refresh the saved plans list
      setSavedPlans(getSavedPlans());

      toast({
        title: "プランを保存しました",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error saving plan:", error);
      toast({
        title: "エラーが発生しました",
        description: "プランの保存に失敗しました",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Handle delete plan
  const handleDeletePlan = (planId: string) => {
    if (window.confirm('このプランを削除しますか？')) {
      deletePlan(planId);
      setSavedPlans(getSavedPlans());
      
      toast({
        title: "プランを削除しました",
        duration: 3000,
      });
    }
  };

  // Handle delete all plans
  const handleDeleteAllPlans = () => {
    if (window.confirm('すべての保存プランを削除しますか？この操作は元に戻せません。')) {
      deleteAllPlans();
      setSavedPlans([]);
      
      toast({
        title: "すべてのプランを削除しました",
        duration: 3000,
      });
    }
  };

  // Handle load plan
  const handleLoadPlan = (plan: SavedPlan) => {
    setFromStation(plan.fromStation);
    setToStation(plan.toStation);
    setDirection(plan.direction);
    
    // Format the time from the plan's start time
    const timeStr = plan.startTime.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
    setStartTime(timeStr);
    
    setRestMinutes(plan.restMinutes);
    
    // Close the dialog
    setIsSavedPlansDialogOpen(false);
    
    toast({
      title: "プランを読み込みました",
      duration: 3000,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      {/* App Header */}
      <header className="bg-[#b6007a] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">都営大江戸線ウォーキングプランナー</h1>
          <Button 
            variant="ghost" 
            size="icon"
            className="p-2 rounded hover:bg-[#d4218e] transition-colors"
            onClick={() => setIsSavedPlansDialogOpen(true)}
          >
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6 pb-20">
        {/* Route Selector */}
        <RouteSelector
          fromStation={fromStation}
          toStation={toStation}
          direction={direction}
          startTime={startTime}
          restMinutes={restMinutes}
          onFromStationChange={(station) => {
            console.log("Setting from station:", station);
            setFromStation(station);
          }}
          onToStationChange={(station) => {
            console.log("Setting to station:", station);
            // nullまたは空文字列の場合はnullに統一する
            setToStation(station === "" ? null : station);
          }}
          onDirectionChange={setDirection}
          onStartTimeChange={setStartTime}
          onRestMinutesChange={setRestMinutes}
        />

        {/* Route Results */}
        {(fromStation && toStation) && (
          <RouteResults
            routes={routes}
            onSavePlan={handleSavePlan}
          />
        )}
      </main>

      {/* Saved Plans Dialog */}
      <SavedPlansDialog
        isOpen={isSavedPlansDialogOpen}
        onClose={() => setIsSavedPlansDialogOpen(false)}
        savedPlans={savedPlans}
        onDeletePlan={handleDeletePlan}
        onDeleteAllPlans={handleDeleteAllPlans}
        onLoadPlan={handleLoadPlan}
      />
    </div>
  );
};

export default HomePage;
