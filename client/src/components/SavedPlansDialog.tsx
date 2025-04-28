import { useState } from "react";
import { SavedPlan } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { formatTime } from "@/lib/routeCalculator";
import { walkingSpeeds } from "@/lib/stations";

interface SavedPlansDialogProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlans: SavedPlan[];
  onDeletePlan: (planId: string) => void;
  onDeleteAllPlans: () => void;
  onLoadPlan: (plan: SavedPlan) => void;
}

const SavedPlansDialog: React.FC<SavedPlansDialogProps> = ({
  isOpen,
  onClose,
  savedPlans,
  onDeletePlan,
  onDeleteAllPlans,
  onLoadPlan
}) => {
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  const handleToggleExpand = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }) + ' ' + date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getSpeedLabel = (speedId: string) => {
    const speed = walkingSpeeds.find(s => s.id === speedId);
    return speed ? speed.label.split(" ")[0] : "不明"; // Just get the Japanese part
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="border-b border-gray-200 pb-2 flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold">保存したプラン一覧</DialogTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onDeleteAllPlans}
            >
              全て削除
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-2 space-y-4">
          {savedPlans.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              保存されたプランはありません
            </div>
          ) : (
            savedPlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-md">
                <div 
                  className="p-3 flex justify-between items-center cursor-pointer"
                  onClick={() => handleToggleExpand(plan.id)}
                >
                  <div>
                    <div className="font-medium">{plan.fromStation} → {plan.toStation}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(plan.createdAt)} 速さ: {getSpeedLabel(plan.walkingSpeed)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleExpand(plan.id);
                      }}
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${expandedPlanId === plan.id ? 'rotate-180' : ''}`} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePlan(plan.id);
                      }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {expandedPlanId === plan.id && (
                  <div className="p-3 pt-0 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-2 mb-2 text-sm">
                      <div>
                        <span className="text-gray-500">総距離:</span> {plan.totalDistance.toFixed(1)} km
                      </div>
                      <div>
                        <span className="text-gray-500">所要時間:</span> {(plan.totalDistance / walkingSpeeds.find(s => s.id === plan.walkingSpeed)!.value).toFixed(1)} 時間
                      </div>
                      <div>
                        <span className="text-gray-500">休憩:</span> {plan.restMinutes}分
                      </div>
                    </div>
                    
                    {/* Timeline (compact version) */}
                    <div className="space-y-3 text-sm mt-3">
                      {plan.stations.filter((station, idx, arr) => {
                        // Only show start, rest stations, and end for compact view
                        return idx === 0 || idx === arr.length - 1 || station.isRestStation;
                      }).map((station, idx, filteredArr) => {
                        const isFirst = idx === 0;
                        const isLast = idx === filteredArr.length - 1;
                        let marker = isFirst ? { className: "bg-blue-500", label: "S" } : 
                                   isLast ? { className: "bg-red-500", label: "E" } : 
                                   { className: "bg-orange-500", label: "R" };
                                   
                        return (
                          <div className="flex" key={`${station.name}-${idx}`}>
                            <div className={`h-5 w-5 rounded-full ${marker.className} flex items-center justify-center text-white text-xs`}>
                              {marker.label}
                            </div>
                            <div className="ml-2">
                              <span className="font-medium">{station.name}</span> {formatTime(station.arrivalTime)}
                              {station.isRestStation && station.departureTime && (
                                <span className="text-orange-600 ml-2">
                                  (休憩: {formatTime(station.departureTime)})
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Button 
                      className="mt-3 w-full bg-[#1e6738] hover:bg-[#0b4523] text-white text-sm"
                      onClick={() => onLoadPlan(plan)}
                    >
                      このプランを読み込む
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SavedPlansDialog;
