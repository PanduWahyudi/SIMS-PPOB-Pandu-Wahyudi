import { useLocation } from "react-router-dom";

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<ChildrenProps> = ({ children }) => {
  const location = useLocation();
  const isRegistrationPage = location.pathname === "/registrasi";
  return (
    <>
      <div className="flex flex-wrap w-full h-screen">
        <div className="w-1/2 h-full flex flex-col space-y-6 justify-center items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/Logo.png" alt="logo" />
            <h1 className="font-medium text-xl uppercase">SIMS PPOB</h1>
          </div>
          <h1 className="text-2xl font-medium text-center px-[30%]">
            {isRegistrationPage
              ? "Lengkapi data untuk membuat akun"
              : "Masuk atau buat akun untuk memulai"}
          </h1>
          {children}
        </div>
        <div className="bg-red-200 w-1/2 h-full ">
          <img
            src="/images/Illustrasi Login.png"
            alt="vector-login"
            className="w-full h-full object-cover
         "
          />
        </div>
      </div>
    </>
  );
};

export { AuthLayout };
