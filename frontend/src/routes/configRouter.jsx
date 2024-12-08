import TourDetail from "../components/TourDetail/TourDetail";
import Home from "../views/Home/Home";
import NotFound from "../views/NotFound/NotFound";
import Tours from "../views/Tours/Tours";
import Register from "../views/Register/Register";
import Login from "../views/login/Login";
import AdminPanel from "../views/AdminPanel/AdminPanel";
import AddTour from "../views/AddTour/AddTour";
import TourInfo from "../components/TourInfo/TourInfo";
import AddCategory from "../views/AddCategory/AddCategory";

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
    path: "/tours/info/:id",
    element: <TourInfo />,
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
    path: "/admin/addCategory",
    element: <AddCategory />,
  },
  { 
    path: "*",
    element: <NotFound />
  },

];

export default configRouter;
