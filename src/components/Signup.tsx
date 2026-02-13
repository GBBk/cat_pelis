import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import type { AuthSignup } from "@/types";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ValidationError } from "yup";
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthState } from "@/context/context";

type FormErrors = Record<string, string>;

const Signup = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<AuthSignup>({
    email: "",
    password: "",
    name: "",
    profile_pic: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const {
    data,
    error,
    loading,
    fn: fnSignup,
  } = useFetch(signup, {
    email: formData.email,
    password: formData.password,
    name: formData.name,
    profile_pic: formData.profile_pic,
  });

  const { fetchUser } = AuthState();

  useEffect(() => {
    if (error === null && data) {
      navigate(searchParams.get("redirect") || "/");
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nombre requerido"),
        email: Yup.string().email("Email invalido").required("Email requerido"),
        password: Yup.string()
          .min(6, "La contraseñae debe tener al menos 6 caracteres")
          .required("Contraseña requerida"),
        profile_pic: Yup.mixed().required("Foto de perfil requerida"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e: unknown) {
      if (e instanceof ValidationError) {
        const newErrors: FormErrors = {};

        e.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });

        setErrors(newErrors);
      }
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrate</CardTitle>
        <CardDescription>crea una cuenta nueva</CardDescription>
        {error && <Error message={error?.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Nombre de usuario"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="usuario@ejemplo.com"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="********"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Registrarse"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
