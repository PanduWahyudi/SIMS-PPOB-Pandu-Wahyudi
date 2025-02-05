import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Link, useLocation } from "react-router-dom";

interface AuthFormProps {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: FieldValues) => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean; // Tambahkan prop isLoading
}

const AuthForm: React.FC<AuthFormProps> = ({
  handleSubmit,
  onSubmit,
  children,
  className,
  isLoading, // Terima prop isLoading
}) => {
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/registrasi";

  return (
    <>
      <form
        className={cn("w-full px-[20%] space-y-10", className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
        <div className="w-full space-y-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="disabled:bg-slate-600"
          >
            {isLoading
              ? "Loading..." // Tampilkan teks loading jika isLoading true
              : isRegistrationPage
              ? "Registrasi"
              : "Masuk"}
          </Button>
          <span className="flex justify-center text-sm space-x-1 text-slate-600">
            <p>{isRegistrationPage ? "sudah" : "belum"} punya akun?</p>
            <p>
              silahkan {isRegistrationPage ? "login" : "registrasi"}
              <Link
                to={isRegistrationPage ? "/" : "/registrasi"}
                className="text-danger font-semibold ml-1"
              >
                di sini
              </Link>
            </p>
          </span>
        </div>
      </form>
    </>
  );
};

export { AuthForm };
