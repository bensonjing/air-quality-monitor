'use client'; 

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{sensorData.reading}</DialogTitle>
          <DialogDescription>{sensorData.name}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}