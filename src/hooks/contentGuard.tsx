import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../pages/notfound";
import { ExpiredSessionModal } from "../components/modals/expiredSessionModal";

interface ContentGuardProps {
  children: React.ReactNode;
}

const ContentGuard: React.FC<ContentGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (token) {
      const parsedToken = JSON.parse(token);
      const currentTime = new Date().getTime();
      const expDate = new Date(parsedToken.expDate).getTime();
      // console.log(expDate);

      if (currentTime > expDate) {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          localStorage.removeItem("token");
          navigate("/");
        }, 3000);
      }
    }
  }, [token, navigate]);

  if (!token) {
    return <NotFoundPage />;
  }

  return (
    <>
      {showModal && <ExpiredSessionModal />}
      {children}
    </>
  );
};

export default ContentGuard;
