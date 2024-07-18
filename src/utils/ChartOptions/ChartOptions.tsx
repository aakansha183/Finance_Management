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
          return `${context.dataset.label}: $${context.raw}`;
        },
      },
    },
  },
};

export const BarChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          return `${context.dataset.label}: $${context.raw}`;
        },
      },
    },
  },
};
