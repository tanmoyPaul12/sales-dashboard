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
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  // 🔹 Filtered data
  const filteredData = salesData.filter(d =>
    d.sales >= threshold &&
    (selectedYear === "all" || d.year === selectedYear)
  );

  // 🔹 KPI Calculations
  const totalSales = filteredData.reduce((sum, d) => sum + d.sales, 0);
  const avgSales = filteredData.length
    ? Math.round(totalSales / filteredData.length)
    : 0;
  const maxSales = filteredData.length
    ? Math.max(...filteredData.map(d => d.sales))
    : 0;

  // 🔹 Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-3 border">
          <p className="text-sm font-semibold">Year: {label}</p>
          <p className="text-blue-500">Sales: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard>

      {/* 🔘 Chart Type Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setChartType("bar")}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            chartType === "bar"
              ? "bg-blue-700"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
        >
          Bar
        </button>

        <button
          onClick={() => setChartType("line")}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            chartType === "line"
              ? "bg-green-700"
              : "bg-green-400 hover:bg-green-600"
          }`}
        >
          Line
        </button>

        <button
          onClick={() => setChartType("pie")}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            chartType === "pie"
              ? "bg-yellow-600"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          Pie
        </button>
      </div>

      {/* 📅 Year Filter */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSelectedYear("all")}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            selectedYear === "all"
              ? "bg-gray-700"
              : "bg-gray-400 hover:bg-gray-600"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setSelectedYear(2022)}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            selectedYear === 2022
              ? "bg-blue-700"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
        >
          2022
        </button>

        <button
          onClick={() => setSelectedYear(2023)}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            selectedYear === 2023
              ? "bg-blue-700"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
        >
          2023
        </button>

        <button
          onClick={() => setSelectedYear(2024)}
          className={`px-3 py-1 rounded text-white transition-all duration-200 ${
            selectedYear === 2024
              ? "bg-blue-700"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
        >
          2024
        </button>
      </div>

      {/* 🔎 Threshold Input */}
      <input
        type="number"
        value={threshold}
        placeholder="Filter min sales..."
        className="border p-2 mb-4 w-full"
        onChange={(e) => setThreshold(Number(e.target.value))}
      />

      {/* 🔁 Reset Button */}
      <button
        onClick={() => {
          setChartType("bar");
          setThreshold(0);
          setSelectedYear("all");
        }}
        className="px-4 py-2 bg-red-500 text-white rounded mb-4 hover:bg-red-600 transition"
      >
        Reset
      </button>

      {/* 📊 KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white shadow rounded-lg text-center transition hover:shadow-lg">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-xl font-bold text-blue-600">{totalSales}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg text-center transition hover:shadow-lg">
          <p className="text-sm text-gray-500">Average Sales</p>
          <p className="text-xl font-bold text-green-600">{avgSales}</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg text-center transition hover:shadow-lg">
          <p className="text-sm text-gray-500">Highest Sales</p>
          <p className="text-xl font-bold text-yellow-600">{maxSales}</p>
        </div>
      </div>

      {/* 📊 Showing Filters */}
      <div className="mb-4 text-sm text-gray-600">
        Showing: {selectedYear === "all" ? "All Years" : selectedYear} | Min Sales: {threshold}
      </div>

      {/* ❗ Empty State */}
      {filteredData.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No data available
        </div>
      ) : (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">

            {chartType === "bar" && (
              <BarChart data={filteredData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            )}

            {chartType === "line" && (
              <LineChart data={filteredData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
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
      )}

    </ChartCard>
  );
}