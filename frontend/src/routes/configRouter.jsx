import TourDetail from "../components/TourDetail/TourDetail";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFount/NotFount";
import Tours from "../views/Tours/Tours";
import Register from "../views/Register/Register";
import Login from "../views/login/Login";
import AdminPanel from "../views/AdminPanel/AdminPanel";
import AddTour from "../views/AddTour/AddTour";

const configRouter = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/tours",
    element: <Tours />,
  },
  {
    path: "/tours/:id",
    element: <TourDetail />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
  {
    path: "/admin/addTour",
    element: <AddTour />,
  },
  { 
    path: "*",
    element: <NotFound />
  },

];

export default configRouter;
