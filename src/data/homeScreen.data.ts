export const holidayData = {
  labels: ["Annual", "Sick", "Unpaid", "Remaining"],
  datasets: {
    label: "Holiday types",
    backgroundColors: ["info", "primary", "dark", "secondary", "primary"],
    data: [15, 20, 12, 30],
  },
};

export const hoursData = {
  labels: ["Total Hours", "Hours Worked"],
  datasets: {
    label: "Hours in a month",
    backgroundColors: ["primary", "secondary"],
    data: [140, 100],
  },
};

const Colors = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
  "error",
  "light",
  "dark",
];

type Value = {
  id: string;
  name: string;
  value: number;
};
export const formatChartData = (values: Value[], label?: string) => {
  const labels = values.map((value) => value.name);
  const data = values.map((value) => value.value);
  let backgroundColors: string[] = [];

  const remainder = values.length % Colors.length;
  const quotient = Math.floor(values.length / Colors.length);
  for (let i = 0; i < quotient; i++) {
    backgroundColors = [...backgroundColors, ...Colors];
  }
  for (let k = 0; k < remainder; k++) {
    backgroundColors.push(Colors[k]);
  }
  return {
    labels,
    datasets: {
      label: label ? label : undefined,
      data,
      backgroundColors,
    },
  };
};
