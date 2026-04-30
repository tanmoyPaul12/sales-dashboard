"use client";

import { useState } from "react";
import { salesData } from "@/data/sales";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import ChartCard from "../molecules/ChartCard";

const CHART_COLORS = {
  bar: "#818cf8",
  line: "#34d399",
  pie: ["#818cf8", "#34d399", "#fbbf24"],
};

export default function SalesChart() {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [threshold, setThreshold] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [showTable, setShowTable] = useState(false);

  // ─── theme tokens ────────────────────────────────────────────
  const bg         = "bg-zinc-50 dark:bg-zinc-900";
  const surface    = "bg-white dark:bg-zinc-800";
  const border     = "border-zinc-200 dark:border-zinc-700";
  const pill       = "bg-zinc-100 dark:bg-zinc-700";
  const pillActive = "bg-white text-zinc-800 shadow-sm dark:bg-zinc-600 dark:text-white dark:shadow";
  const pillIdle   = "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200";
  const txt        = "text-zinc-800 dark:text-zinc-100";
  const sub        = "text-zinc-400 dark:text-zinc-500";
  const inputCls   = "bg-white border-zinc-200 text-zinc-700 placeholder:text-zinc-300 focus:ring-indigo-300 focus:border-indigo-400 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:ring-indigo-500 dark:focus:border-indigo-500";
  const rowHover   = "hover:bg-zinc-50 dark:hover:bg-zinc-700/40";
  const thead      = "bg-zinc-50 text-zinc-400 dark:bg-zinc-700/50 dark:text-zinc-400";
  const tdColor    = "text-zinc-600 dark:text-zinc-300";
  const axisColor  = "#a1a1aa";

  // ─── kpi cards ───────────────────────────────────────────────
  const kpiCards = [
    {
      label: "Total Sales",
      value: 0,
      accent: "border-indigo-100 bg-indigo-50/60 dark:border-indigo-500/30 dark:bg-indigo-500/10",
      val: "text-indigo-600 dark:text-indigo-400",
    },
    {
      label: "Avg Sales",
      value: 0,
      accent: "border-emerald-100 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10",
      val: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Peak Sales",
      value: 0,
      accent: "border-amber-100 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/10",
      val: "text-amber-600 dark:text-amber-400",
    },
  ];

  // ─── data ────────────────────────────────────────────────────
  const filteredData = salesData.filter(
    (d) => d.sales >= threshold && (selectedYear === "all" || d.year === selectedYear)
  );
  const totalSales = filteredData.reduce((s, d) => s + d.sales, 0);
  const avgSales   = filteredData.length ? Math.round(totalSales / filteredData.length) : 0;
  const maxSales   = filteredData.length ? Math.max(...filteredData.map((d) => d.sales)) : 0;

  kpiCards[0].value = totalSales;
  kpiCards[1].value = avgSales;
  kpiCards[2].value = maxSales;

  // ─── tooltip ─────────────────────────────────────────────────
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className={`${surface} border ${border} rounded-xl px-4 py-3 shadow-xl text-sm`}>
        <p className={`${sub} text-xs mb-1`}>Year: {label}</p>
        <p className={`${txt} font-semibold`}>{payload[0].value.toLocaleString()}</p>
      </div>
    );
  };

  // ─── segmented control ───────────────────────────────────────
  const Seg = ({
    options,
    value,
    onChange,
  }: {
    options: { key: string; label: string }[];
    value: string | number;
    onChange: (v: any) => void;
  }) => (
    <div className={`flex items-center ${pill} rounded-lg p-0.5 gap-0.5`}>
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() =>
            onChange(key === "all" ? "all" : isNaN(Number(key)) ? key : Number(key))
          }
          className={`px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-150 ${
            String(value) === String(key) ? pillActive : pillIdle
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`${bg} min-h-screen p-3 sm:p-6 transition-colors duration-300`}>
      <div className={`w-full max-w-2xl mx-auto ${surface} border ${border} rounded-2xl shadow-sm overflow-hidden`}>

        {/* ── Header ── */}
        <div className={`relative flex items-center justify-between px-4 sm:px-6 py-4 border-b ${border}`}>
          {/* on mobile: left-aligned, on sm+: centered absolutely */}
          <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 text-left sm:text-center">
            <h1 className={`text-sm font-medium ${txt}`}>Sales Dashboard</h1>
            <p className={`text-xs ${sub} mt-0.5`}>
              {filteredData.length} records · {selectedYear === "all" ? "All years" : selectedYear}
            </p>
          </div>
          <div className="ml-auto sm:ml-0">
            <button
              onClick={() => { setChartType("bar"); setThreshold(0); setSelectedYear("all"); }}
              className={`text-xs ${sub} hover:text-red-400 border ${border} px-3 py-1.5 rounded-lg transition-all duration-150`}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5">

          {/* ── Controls ── */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <Seg
              options={[
                { key: "bar",  label: "Bar"  },
                { key: "line", label: "Line" },
                { key: "pie",  label: "Pie"  },
              ]}
              value={chartType}
              onChange={setChartType}
            />
            <Seg
              options={[
                { key: "all",  label: "All"  },
                { key: "2022", label: "2022" },
                { key: "2023", label: "2023" },
                { key: "2024", label: "2024" },
              ]}
              value={selectedYear}
              onChange={setSelectedYear}
            />
            <input
              type="number"
              value={threshold}
              placeholder="Min sales..."
              onChange={(e) => setThreshold(Number(e.target.value))}
              className={`border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 transition w-full sm:w-32 ${inputCls}`}
            />
          </div>

          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {kpiCards.map(({ label, value, accent, val }) => (
              <div
                key={label}
                className={`rounded-xl border p-4 flex sm:block items-center justify-between sm:text-center ${accent} transition-all`}
              >
                <p className={`text-[10px] uppercase tracking-widest font-medium ${sub} sm:mb-1.5`}>
                  {label}
                </p>
                <p className={`text-lg font-bold tabular-nums ${val}`}>
                  {value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* ── Chart ── */}
          {filteredData.length === 0 ? (
            <div className={`h-48 sm:h-64 flex flex-col items-center justify-center ${sub} gap-2`}>
              <span className="text-3xl opacity-40">📭</span>
              <span className="text-sm">No data matches your filters</span>
            </div>
          ) : (
            <div className="h-48 sm:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart data={filteredData} barSize={28}>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                    <Bar dataKey="sales" fill={CHART_COLORS.bar} radius={[5, 5, 0, 0]} />
                  </BarChart>
                ) : chartType === "line" ? (
                  <LineChart data={filteredData}>
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke={CHART_COLORS.line}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: CHART_COLORS.line, strokeWidth: 0 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={filteredData}
                      dataKey="sales"
                      nameKey="year"
                      outerRadius="80%"
                      innerRadius="40%"
                    >
                      {filteredData.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS.pie[i % CHART_COLORS.pie.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          )}

          {/* ── Data Table Toggle ── */}
          {filteredData.length > 0 && (
            <div>
              <button
                onClick={() => setShowTable((v) => !v)}
                className={`flex items-center gap-2 text-xs ${sub} hover:text-indigo-400 transition-colors`}
              >
                <span className={`transition-transform duration-200 ${showTable ? "rotate-90" : ""}`}>
                  ▶
                </span>
                {showTable ? "Hide" : "Show"} data table
              </button>

              {showTable && (
                <div className={`mt-3 rounded-xl border ${border} overflow-x-auto text-sm`}>
                  <table className="w-full min-w-[280px]">
                    <thead>
                      <tr className={thead}>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide">Year</th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide">Sales</th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide">vs Avg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((row, i) => (
                        <tr key={i} className={`border-t ${border} ${rowHover} transition-colors`}>
                          <td className={`px-4 py-2.5 font-medium ${tdColor}`}>{row.year}</td>
                          <td className={`px-4 py-2.5 ${tdColor}`}>{row.sales.toLocaleString()}</td>
                          <td className={`px-4 py-2.5 font-medium ${
                            row.sales >= avgSales ? "text-emerald-500" : "text-red-400"
                          }`}>
                            {row.sales >= avgSales ? "▲" : "▼"}{" "}
                            {Math.abs(row.sales - avgSales).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}