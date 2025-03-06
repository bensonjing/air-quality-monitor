'use client'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';
import { sensorDataTypes } from "@/types";
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

export default function DataCard( {sensorData, dangerLevel} : {sensorData : sensorDataTypes, dangerLevel : number[]} ) {
  return (
    <Dialog>
      <DialogTrigger asChild className="h-full">
        <Card>
          <CardHeader>
            <CardDescription className="text-lg">{sensorData.name}</CardDescription>
            <CardTitle className="font-bold">
              <span className="text-5xl">{sensorData.reading}</span>
              <span className="text-3xl">{sensorData.unit}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GaugeComponent
              value={sensorData.reading}
              minValue={dangerLevel[0]}
              maxValue={dangerLevel[4]}
              type="radial"
              labels={{
                valueLabel: {
                  formatTextValue: (value) => `${value}`, 
                },
                tickLabels: {
                  type: "inner",
                  ticks: [
                    { value: dangerLevel[0] },
                    { value: dangerLevel[1] },
                    { value: dangerLevel[2] },
                    { value: dangerLevel[3] },
                    { value: dangerLevel[4] },
                  ]
                }
              }}
              arc={{
                colorArray: ['#5BE12C','#EA4228'],
                subArcs: [{}, {}, {}, {}, {}],
                padding: 0.02,
                width: 0.3
              }}
              pointer={{
                elastic: true,
                animationDelay: 0
              }}
            />
          </CardContent>
        </Card>        
      </DialogTrigger>
      <DialogContent className="fixed inset-0">
        <DialogHeader>
          <DialogDescription className="text-lg">{sensorData.name}</DialogDescription>
          <DialogTitle className="font-bold">
            <span className="text-5xl">{sensorData.reading}</span>
            <span className="text-3xl">{sensorData.unit}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 h-64">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart
              width={500}
              height={300}
              data={sensorData.history.slice(-20)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="time" tick={false}/>
              <YAxis />
              <Legend />
              <Line type="monotone" dataKey="reading" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  )
}