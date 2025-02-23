'use client'

import { useQuery } from "@tanstack/react-query";
import { onValue } from "firebase/database"; 
import { dataRef } from '@/services/firebase'; 
    
export const useFirebaseData = () => {
  return useQuery({
    queryKey: ['sensorData'],
    queryFn: () => new Promise((resolve) => {
      onValue(dataRef, (snapshot) => {
        resolve(snapshot.val());
      });
    }),
    refetchInterval: 5000, 
    staleTime: 5000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};