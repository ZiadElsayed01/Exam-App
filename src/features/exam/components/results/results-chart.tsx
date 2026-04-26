"use client";

import {
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer } from "@/shared/components/ui/chart";
import { ISubmission } from "../../types/submisstions";

interface ResultChartProps {
  result?: ISubmission | null;
}

export default function ResultChart({ result }: ResultChartProps) {
  if (!result) return null;

  const correct = result.submission.correctAnswers;
  const incorrect = result.submission.wrongAnswers;
  const total = correct + incorrect;

  const chartData = [
    {
      name: "Results",
      correct,
      incorrect,
    },
  ];

  const chartConfig = {
    correct: { label: "Correct", color: "#00BC7D" },
    incorrect: { label: "Incorrect", color: "#EF4444" },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ChartContainer
        config={chartConfig}
        className="w-[203px] h-[203px] flex items-center justify-center"
      >
        <RadialBarChart
          data={chartData}
          innerRadius={60}
          outerRadius={100}
          startAngle={90}
          endAngle={450}
        >
          <PolarGrid gridType="circle" radialLines={false} stroke="none" />

          <RadialBar
            dataKey="correct"
            stackId="a"
            fill="#00BC7D"
            cornerRadius={0}
          />

          <RadialBar
            dataKey="incorrect"
            stackId="a"
            fill="#EF4444"
            cornerRadius={0}
          />

          <PolarRadiusAxis tick={false} axisLine={false} domain={[0, total]} />
        </RadialBarChart>
      </ChartContainer>

      {/* Legend */}
      <div className="flex flex-col text-sm mt-4 gap-2 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500"></div>
          <p>Correct: {correct}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <p>Incorrect: {incorrect}</p>
        </div>
      </div>
    </div>
  );
}
