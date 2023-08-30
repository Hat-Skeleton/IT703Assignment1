import { redirect } from "react-router-dom";

export const AuthLoader = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) return redirect("/login");

  return null;
};
