import { FC } from "react";
import PieChart, { PieChartProps } from "./PieChart";

type Props = PieChartProps;

const TMSHolidaychart: FC<Props> = ({ chart, ...props }) => {
  return <PieChart chart={chart} {...props} />;
};

export default TMSHolidaychart;
