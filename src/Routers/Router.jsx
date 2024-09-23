import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Components/Layout/Main";
import DoctorProfile from "../Pages/Doctor Profile/DoctorProfile";
import SignUP from "../Pages/SignUp/SignUP";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/docsprofile",
        element: <DoctorProfile></DoctorProfile>,
      },
      {
        path: "/signup",
        element: <SignUP></SignUP>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      }
    ],
  },
]);
export default router;
