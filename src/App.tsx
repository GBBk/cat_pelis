import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Auth from "./pages/Auth";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import AppLayout from "./layouts/AppLayout";
import AuthProvider from "./context";
import RequireAuth from "./components/RequireAuth";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",

          element: (
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          ),
        },
        {
          path: "/:id",
          element: (
            <RequireAuth>
              <Watchlist />
            </RequireAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
