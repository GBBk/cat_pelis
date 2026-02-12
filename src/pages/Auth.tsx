import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();

  useEffect(() => {
    if (isAuthenticated && !loading) navigate("/");
  }, [isAuthenticated, loading]);

  return (
    <div className="mt-20 flex flex-col items-center gap-10">
      <h1 className="text-5xl font-extrabold text-white ">
        Iniciar sesión / Registrarse
      </h1>
      <Tabs defaultValue="login" className="w-100">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
          <TabsTrigger value="signup">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
