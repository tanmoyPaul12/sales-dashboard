"use client";

import { useState } from "react";
import { salesData } from "@/data/sales";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";

import ChartCard from "../molecules/ChartCard";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export default function SalesChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState(0);

  const filteredData = salesData.filter(d => d.sales >= threshold);

  return (
    <ChartCard>
      
      {/* 🔘 Chart Type Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setChartType("bar")}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Bar
        </button>

        <button
          onClick={() => setChartType("line")}
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Line
        </button>

        <button
          onClick={() => setChartType("pie")}
          className="px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Pie
        </button>
      </div>

      {/* 🔎 Filter Input */}
      <input
        type="number"
        placeholder="Filter min sales..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setThreshold(Number(e.target.value))}
      />

      {/* 📊 Chart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          
          {chartType === "bar" && (
            <BarChart data={filteredData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          )}

          {chartType === "line" && (
            <LineChart data={filteredData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" />
            </LineChart>
          )}

          {chartType === "pie" && (
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="sales"
                nameKey="year"
                outerRadius={100}
              >
                {filteredData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          )}

        </ResponsiveContainer>
      </div>

    </ChartCard>
  );
}