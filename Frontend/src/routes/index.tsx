import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { DriverHomePage } from "../pages/DriverHomePage";
import { ParkingManagerHomePage } from "../pages/ParkingManagerHomePage";
import { SystemAdminHomePage } from "../pages/SystemAdminHomePage";
import { NotificationsPage } from "../pages/NotificationsPage";
import { ReservationsPage } from "../pages/ReservationsPage";
import { NotificationProvider } from "../contexts/NotificationContext";

function LayoutWithProvider() {
  return (
    <NotificationProvider>
      <Layout />
    </NotificationProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/driverHomePage",
    element: <LayoutWithProvider />,
    children: [
      {
        index: true,
        element: <DriverHomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "reservations",
        element: <ReservationsPage />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
    ],
  },
  {
    path: "/parkingManagerHomePage",
    element: <LayoutWithProvider />,
    children: [
      {
        index: true,
        element: <ParkingManagerHomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/systemAdminHomePage",
    element: <LayoutWithProvider />,
    children: [
      {
        index: true,
        element: <SystemAdminHomePage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
