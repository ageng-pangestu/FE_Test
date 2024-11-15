import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/common/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function RootLayout() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RootLayout;
