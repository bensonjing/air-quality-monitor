'use client'

import { useFirebaseData } from "@/hooks/useSensorData";

export default function App() {
  const { data, error, isLoading } = useFirebaseData();
    
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data); 

  return (
    <h1>Hello</h1>
  );
}