'use client'

import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { onValue } from "firebase/database"; 
import { dataRef } from '@/services/firebase'; 
import { rawDataTypes } from "@/types";

const defaultData: rawDataTypes = {
  sensorData: {
    co2: 0,
    humidity: 0,
    pm25: 0,
    temperature: 0,
    tvoc: 0,
  },
  sensorHistory: {
    co2: {},
    humidity: {},
    pm25: {},
    temperature: {},
    tvoc: {},
  }
};
    
export const useFirebaseData = () => {
  return useQuery<rawDataTypes>({
    queryKey: ['sensorData', 'sensorHistory'],
    queryFn: () => new Promise((resolve) => {
      onValue(dataRef, (snapshot) => {
        resolve(snapshot.val() ?? defaultData);
      });
    }),
    refetchInterval: 5000, 
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
