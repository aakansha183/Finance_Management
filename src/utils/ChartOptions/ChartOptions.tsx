export const LineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          return `${context.dataset.label}: $${context.raw}`;
        },
      },
    },
  },
};

export const BarChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          return `${context.dataset.label}: $${context.raw}`;
        },
      },
    },
  },
};
