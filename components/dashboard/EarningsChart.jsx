"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function EarningsChart({ data, labels }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Earnings (₹)",
            data: data || [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(59, 130, 246, 0.5)", // blue-500
            borderColor: "rgb(37, 99, 235)", // blue-600
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return (
    <div className="bg-white border rounded-xl p-4 lg:col-span-2">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">Earnings Overview</h3>
        <span className="text-sm text-gray-500">Last 7 days</span>
      </div>

      <div className="h-96">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
