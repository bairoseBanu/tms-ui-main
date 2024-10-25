import { LoaderFunction, redirect } from "react-router-dom";
interface Payload {
  id: string;
  email: string;
  role: string;
  branchId: string | null;
  isPaid: boolean;
  plan: "Silver" | "Gold" | "Platinum";
}

export const protectedLoader: (fn: LoaderFunction) => LoaderFunction =
  (fn) =>
  (...args) => {
    return localStorage.getItem("token") ? fn(...args) : redirect("/auth");
  };

export const pushThroughProtected: (fn: LoaderFunction) => LoaderFunction =
  (fn) =>
  (...args) => {
    return !localStorage.getItem("token") ? fn(...args) : redirect("/");
  };

export const signOut = () => {
  localStorage.removeItem("token");
  redirect("/auth");
};

export const extractPayload = () => {
  const token = localStorage.getItem("token");
  const decodedToken = atob(token.split(".")[1]);
  const payload = JSON.parse(decodedToken) as Payload;
  return payload;
};
