const durations = ["year", "month", "week", "hour"];
export const getPaygradeDurationOptions = () => {
  return durations.map((dur, index) => ({
    id: `${index}`,
    label: dur.toUpperCase(),
    value: dur,
  }));
};
