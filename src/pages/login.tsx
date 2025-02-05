import "../styles/App.css";
import { EmailInput, PasswordInput } from "../components/input";
import { FieldValues, useForm } from "react-hook-form";
import { LoginValues, loginSchema } from "../validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthForm } from "../components/authForm";
import { AuthLayout } from "../components/layouts/authlayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../axios/axios";
import { Alert } from "../components/alert";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/login", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const date = new Date();
        date.setHours(date.getHours() + 12);

        localStorage.setItem(
          "token",
          JSON.stringify({
            value: response.data.data.token,
            expDate: date.getTime(),
          })
        );
        setAlert({ message: "Login successful!", type: "success" });
        reset();
        navigate("/beranda");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setAlert({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
      console.log(localStorage.getItem("token"));
    }
  };

  const closeAlert = () => {
    setAlert(null);
  };
  return (
    <>
      <AuthLayout>
        <AuthForm
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          className=""
          isLoading={isLoading}
        >
          <div className="w-full space-y-6">
            <div className="w-full">
              <EmailInput
                {...register("email")}
                error={!!errors.email}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-danger mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <PasswordInput
                {...register("password")}
                error={!!errors.password} // Pass error state
                disabled={isLoading} // Pass loading state
              />
              {errors.password && (
                <p className="text-danger mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </AuthForm>
      </AuthLayout>
      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
    </>
  );
}

export default LoginPage;
