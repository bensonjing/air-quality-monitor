import { rawDataTypes, sensorDataTypes, sensorHistoryTypes } from "@/types"

// Convert Firebase timestamps (seconds) to "YYYY-MM-DD HH:mm:ss"
const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString("en-US", { 
    year: "numeric", 
    month: "2-digit", 
    day: "2-digit", 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit", 
    hour12: false
  }).replace(",", ""); // Remove comma for proper spacing
};

// Convert Firebase history object into an array
const parseHistory = (historyObj: Record<string, number>): sensorHistoryTypes[] => {
  return Object.entries(historyObj)
    .map(([timestamp, reading]) => ({
      time: formatTimestamp(parseInt(timestamp)), // Convert timestamp
      reading,
    }))
    .sort((a, b) => parseInt(a.time) - parseInt(b.time)); // Sort by time ascending
};

export const formatData = (rawData: rawDataTypes) : sensorDataTypes[] => {
  return [
    {
      name: "Temperature",
      unit: "°C",
      reading: rawData.sensorData.temperature,
      history: parseHistory(rawData.sensorHistory.temperature),
    },
    {
      name: "Humidity",
      unit: "%",
      reading: rawData.sensorData.humidity,
      history: parseHistory(rawData.sensorHistory.humidity),
    },
    {
      name: "CO2",
      unit: "ppm",
      reading: rawData.sensorData.co2 - 400,
      history: parseHistory(rawData.sensorHistory.co2),
    },
    {
      name: "PM2.5",
      unit: "µg/m³",
      reading: rawData.sensorData.pm25,
      history: parseHistory(rawData.sensorHistory.pm25),
    },
    {
      name: "TVOC",
      unit: "ppb",
      reading: rawData.sensorData.tvoc,
      history: parseHistory(rawData.sensorHistory.tvoc),
    },
  ];
}