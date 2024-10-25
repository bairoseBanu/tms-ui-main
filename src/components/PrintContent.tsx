import { ReactNode, forwardRef } from "react";
type Props = {
  children: ReactNode;
};

const PrintContent = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return <div ref={ref}>{children}</div>;
});

export default PrintContent;
