"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RadarChart({ data, labels }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext("2d");

        chartInstance.current = new Chart(ctx, {
            type: "radar",
            data: {
                labels: labels || [
                    "Cleaning",
                    "Plumbing",
                    "Electrical",
                    "Carpentry",
                    "Gardening",
                    "Painting",
                ],
                datasets: [
                    {
                        label: "Earnings by Category",
                        data: data || [65, 59, 90, 81, 56, 85],
                        fill: true,
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                        borderColor: "rgb(37, 99, 235)",
                        pointBackgroundColor: "rgb(37, 99, 235)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgb(37, 99, 235)",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)",
                        },
                        grid: {
                            color: "rgba(0, 0, 0, 0.1)",
                        },
                        pointLabels: {
                            font: {
                                size: 12,
                            },
                        },
                        ticks: {
                            beginAtZero: true,
                            backdropColor: "transparent",
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: "top",
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
        <div className="h-56">
            <canvas ref={chartRef} />
        </div>
    );
}
