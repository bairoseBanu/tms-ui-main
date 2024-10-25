export const getDateRange = (startDt: string, endDt: string) => {
  if (!endDt) {
    return [startDt];
  }
  const startDate = new Date(startDt);
  const endDate = new Date(endDt);
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString());
    currentDate.setDate(currentDate.getDate() + 1); // Add one day
  }
  return dates;
};
