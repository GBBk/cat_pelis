import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = UrlState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />;

  if (!isAuthenticated) return children;
}

export default RequireAuth;
