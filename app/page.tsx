'use client'

import { useFirebaseData } from "@/hooks/useFirebaseData";
import DataCard from "@/components/DataCard";
import { formatData } from "@/lib/formatData";
import { rawDataTypes, sensorDataTypes } from "@/types";

export default function App() {
  const { data, error, isLoading } = useFirebaseData();

  if (!data) return <p>Loading</p>;

  const sensorData : sensorDataTypes[] = formatData(data);

  return (
    <div className="grid grid-cols-4 gap-4 m-20 h-150">
      <div className="col-span-2 row-span-2 h-full">
        <DataCard sensorData={sensorData[4]} dangerLevel={[0, 50, 150, 400, 800]} />
      </div>

      <div className="col-span-1 h-full">
        <DataCard sensorData={sensorData[0]} dangerLevel={[15, 20, 25, 30, 35]} />
      </div>

      <div className="col-span-1 h-full">
        <DataCard sensorData={sensorData[1]} dangerLevel={[30, 40, 50, 60, 70]}/>
      </div>

      <div className="col-span-1 h-full">
        <DataCard sensorData={sensorData[2]} dangerLevel={[400, 600, 800, 1000, 1200]}/>
      </div>

      <div className="col-span-1 h-full">
        <DataCard sensorData={sensorData[3]} dangerLevel={[0, 12, 35, 55, 150]}/>
      </div>
    </div>
  );
}