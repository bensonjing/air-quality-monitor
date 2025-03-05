export interface rawDataTypes {
  sensorData: {
    temperature: number;
    humidity: number;
    co2: number; 
    pm25: number;
    tvoc: number;
  }; 
  sensorHistory: {
    temperature: Record<string, number>;
    humidity: Record<string, number>;
    co2: Record<string, number>;
    pm25: Record<string, number>;
    tvoc: Record<string, number>;
  }
}

export interface sensorHistoryTypes {
  time: string; 
  reading: number; 
}

export interface sensorDataTypes {
  name: string;
  reading: number;
  unit: string;
  history: sensorHistoryTypes[]; 
}