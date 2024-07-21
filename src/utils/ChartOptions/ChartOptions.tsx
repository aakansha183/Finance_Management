import { ChartOptions, TooltipItem } from "chart.js";

export const LineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"line">) => {
          // Ensure `context.raw` is treated as a number
          return `${context.dataset.label}: $${(context.raw as number).toFixed(
            2
          )}`;
        },
      },
    },
  },
};

export const BarChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          // Ensure `context.raw` is treated as a number
          const label = context.dataset.label || "";
          const value = context.raw as number;
          return `${label}: $${value.toFixed(2)}`;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        callback: (value) => `$${value}`,
      },
    },
  },
};
