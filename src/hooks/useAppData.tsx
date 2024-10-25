import { useContext } from "react";
import { AppDataContext } from "context/appData";

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData should be used inside the AppData provider");
  }
  return context;
};
