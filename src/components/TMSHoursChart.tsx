import PieChart, { PieChartProps } from "./PieChart";
import { FC } from "react";
type Props = PieChartProps;

const TMSHoursChart: FC<Props> = ({ chart, ...props }) => {
  return <PieChart chart={chart} {...props} />;
};

export default TMSHoursChart;
