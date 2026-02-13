import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Auth from "./pages/Auth";
import Favorites from "@/pages/Favorites";
import Watchlist from "./pages/Watchlist";
import AppLayout from "./layouts/AppLayout";
import AuthProvider from "./context/context";
import RequireAuth from "./components/RequireAuth";
import { MovieProvider } from "./context/MovieProvider";

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
          path: "/favoritas",

          element: (
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          ),
        },
        {
          path: "/movielist",
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
      <MovieProvider>
        <RouterProvider router={router} />
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
