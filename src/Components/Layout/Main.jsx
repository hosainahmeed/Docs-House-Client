import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Pages/Home/Shared/Header/Navbar";
import Footer from "../../Pages/Home/Shared/Footer/Footer";

function Main() {
  const location = useLocation();
  const visualOutlet =
    location.pathname.includes("signup") || location.pathname.includes("login");

  return (
    <div>
      {visualOutlet ? (
        <Outlet></Outlet>
      ) : (
        <>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </>
      )}
    </div>
  );
}

export default Main;
