import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Direction } from "@shared/schema";
import OedoMap from "./OedoMap";
import { getStationOptions, getRestTimeOptions } from "@/lib/stations";

interface RouteSelectorProps {
  fromStation: string | null;
  toStation: string | null;
  direction: Direction;
  startTime: string;
  restMinutes: number;
  onFromStationChange: (station: string) => void;
  onToStationChange: (station: string) => void;
  onDirectionChange: (direction: Direction) => void;
  onStartTimeChange: (time: string) => void;
  onRestMinutesChange: (minutes: number) => void;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({
  fromStation,
  toStation,
  direction,
  startTime,
  restMinutes,
  onFromStationChange,
  onToStationChange,
  onDirectionChange,
  onStartTimeChange,
  onRestMinutesChange
}) => {
  const [activeTab, setActiveTab] = useState<string>("map");
  const stationOptions = getStationOptions();
  const restTimeOptions = getRestTimeOptions();
  
  const handleStationClick = (stationName: string) => {
    if (!fromStation) {
      onFromStationChange(stationName);
    } else if (!toStation && stationName !== fromStation) {
      onToStationChange(stationName);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">プランを作成</h2>
      
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-b border-gray-200 mb-4 w-full justify-start">
          <TabsTrigger 
            value="map" 
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#1e6738] data-[state=active]:text-[#1e6738] data-[state=active]:font-medium"
          >
            地図で指定
          </TabsTrigger>
          <TabsTrigger 
            value="text" 
            className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#1e6738] data-[state=active]:text-[#1e6738] data-[state=active]:font-medium"
          >
            キーワードで指定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mb-6">
          <div className="bg-gray-50 p-2 rounded-lg mb-4 text-sm">
            <p>
              出発駅と到着駅を選択してください。
              <span className="bg-blue-500 text-white px-1 rounded ml-2">青</span>: 出発駅 / 
              <span className="bg-red-500 text-white px-1 rounded ml-2">赤</span>: 到着駅
            </p>
          </div>
          
          <OedoMap
            selectedFromStation={fromStation}
            selectedToStation={toStation}
            onStationClick={handleStationClick}
          />
        </TabsContent>

        <TabsContent value="text" className="mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fromStationSelect" className="block text-sm font-medium text-gray-700 mb-1">
                出発駅
              </Label>
              <Select 
                value={fromStation || ""} 
                onValueChange={onFromStationChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="駅を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {stationOptions.filter(option => option.value !== toStation).map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="toStationSelect" className="block text-sm font-medium text-gray-700 mb-1">
                到着駅
              </Label>
              <Select 
                value={toStation || ""} 
                onValueChange={onToStationChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="駅を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {stationOptions.filter(option => option.value !== fromStation).map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Route Settings */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">進行方向</h3>
          <RadioGroup 
            defaultValue={direction} 
            onValueChange={(value) => onDirectionChange(value as Direction)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clockwise" id="clockwise" />
              <Label htmlFor="clockwise">時計回り</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="counterclockwise" id="counterclockwise" />
              <Label htmlFor="counterclockwise">反時計回り</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
            出発時刻
          </Label>
          <Input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label htmlFor="restMinutes" className="block text-sm font-medium text-gray-700 mb-1">
            休憩時間
          </Label>
          <Select 
            value={restMinutes.toString()} 
            onValueChange={(value) => onRestMinutesChange(parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="休憩時間を選択" />
            </SelectTrigger>
            <SelectContent>
              {restTimeOptions.map(option => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default RouteSelector;
