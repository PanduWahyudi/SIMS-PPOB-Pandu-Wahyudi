import "../styles/App.css";
import { EmailInput, PasswordInput, NameInput } from "../components/input";
import {
  RegistrationValues,
  registrationSchema,
} from "../validation/authValidation";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../components/layouts/authlayout";
import { AuthForm } from "../components/authForm";
import { useState } from "react";
import { Alert } from "../components/alert";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

function RegistrationPage() {
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
  } = useForm<RegistrationValues>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/registration", {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
      });

      if (response.status === 200) {
        setAlert({ message: "Registration successful!", type: "success" });
        reset();
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setAlert({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
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
              <NameInput
                placeholder="nama depan"
                {...register("first_name")}
                error={!!errors.first_name}
                disabled={isLoading}
              />
              {errors.first_name && (
                <p className="text-danger mt-1 text-sm">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <NameInput
                placeholder="nama belakang"
                {...register("last_name")}
                error={!!errors.last_name}
                disabled={isLoading}
              />
              {errors.last_name && (
                <p className="text-danger mt-1 text-sm">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <PasswordInput
                {...register("password")}
                placeholder="buat password"
                error={!!errors.password}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-danger mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <PasswordInput
                {...register("confirm_password")}
                placeholder="konfirmasi password"
                error={!!errors.confirm_password}
                disabled={isLoading}
              />
              {errors.confirm_password && (
                <p className="text-danger mt-1 text-sm">
                  {errors.confirm_password.message}
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

export default RegistrationPage;
