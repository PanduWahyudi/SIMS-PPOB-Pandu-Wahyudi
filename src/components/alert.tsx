import React, { useEffect } from "react";

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close setelah 5 detik

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-2 left-4 w-1/4 p-1 rounded-md border ${
        type === "success"
          ? "bg-green-500/20 border-green-500 text-green-500"
          : "bg-danger/20 border-danger text-danger "
      }`}
    >
      {message}
    </div>
  );
};

export { Alert };
