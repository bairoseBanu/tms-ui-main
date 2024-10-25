
type PlanFeature={
    id:string;
    content:string;
  }
 export interface PlanItem{
    id:string;
    planName:string;
    features:PlanFeature[];
    price:string;
  }
 export interface PlanProps {
    items:PlanItem[];
    name:string;
  }