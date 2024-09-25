import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Toaster } from "sonner";
import SessionEnd from "./pages/SessionEnd.jsx";
import Header from "./components/common/Header.jsx";
import "./style/index.css";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/session-end",
        element: <SessionEnd />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      richColors
      position="top-center"
      closeButton={true}
      invert={true}
    />
  </StrictMode>
);
