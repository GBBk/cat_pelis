import { CustomHeader } from "@/components/CustomHeader";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container m-auto">
        <CustomHeader></CustomHeader>
        <Outlet></Outlet>
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        <p className="text-2xl mt-5 p-3 text-center">
          Hecho con amor por <a href="https://github.com/GBBk">GBBk</a>
        </p>
      </div>
    </div>
  );
};

export default AppLayout;
