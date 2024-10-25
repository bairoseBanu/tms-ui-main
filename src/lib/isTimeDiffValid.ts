export const isTimeDiffValid = (from: string, to: string) => {
  const fromHrs = from.split(":");
  const toHrs = to.split(":");
  if (fromHrs[0] < toHrs[0]) {
    return true;
  }
  if (fromHrs[0] === toHrs[0]) {
    if (fromHrs[1] < toHrs[1]) return true;
    return false;
  }
  return false;
};
