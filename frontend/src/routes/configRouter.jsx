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
import Reservation from "../views/Reservation/Reservation";
import FavoritesPage from "../components/Favorites/FavoritePage";
import ReservationSection from "../components/ReservationSection/ReservationSection";
import ProfileAdd from "../views/Profile/Profile";
import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";

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
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/addTour",
    element: (
      <AdminRoute>
        <AddTour />
      </AdminRoute>
    ),
  },
  {
    path: "/admin/addCategory",
    element: (
      <AdminRoute>
        <AddCategory />
      </AdminRoute>
    ),
  },
  {
    path: "/reservation/tour/:tourId",
    element: (
      <ProtectedRoute>
        <Reservation />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
        <FavoritesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reservations",
    element: (
      <ProtectedRoute>
        <ReservationSection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileAdd />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default configRouter;
