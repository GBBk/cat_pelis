import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router";
import logo from "@/images/logo-buscador-pelis.png";
import { Button } from "./ui/button";
import { BookmarkIcon, LogOutIcon, StarIcon } from "lucide-react";
import { AuthState } from "@/context/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";

export const CustomHeader = () => {
  const { user, fetchUser } = AuthState();
  const navigate = useNavigate();

  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="gbbk - buscador de peliculas" className="logo" />
        </Link>
        {!user ? (
          <Button onClick={() => navigate("/auth")}>Login</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={user?.user_metadata?.profile_pic}
                  className="object-contain"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 text-white">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/favoritas");
                  }}
                >
                  <StarIcon className="mr-1 h-4 w-4" />
                  <span>Películas favoritas</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/movielist");
                  }}
                >
                  <BookmarkIcon className="mr-1 h-4 w-4" />
                  <span>Movielist</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-red-400">
                  <LogOutIcon className="mr-1 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Cerrar sesión
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      {loading && <BarLoader width={"100%"} color="#36d7b7" />}
    </>
  );
};
