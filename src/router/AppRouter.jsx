import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'cheking') {
    return (
      <h3>Cargando...</h3>
    );
  }

  return (
    <Routes>
      {/* Routes go here */}
      {
        (status === 'authenticated') ?
          (<>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
          </>) :
          (<>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to={"/auth/login"} />} />
          </>)
      }
    </Routes>
  )
}
