export type PaygradeDuration = "year" | "month";
("week");
("hour");

export type PaygradeValues = {
  paygradeId?: string;
  name: string;
  duration: PaygradeDuration;
  minimumRange: number;
  maximumRange: number;
  isActive: boolean;
  branchId: string;
};
