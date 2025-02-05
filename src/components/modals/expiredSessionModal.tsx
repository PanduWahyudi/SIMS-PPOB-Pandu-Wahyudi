import React from "react";
import { TriangleAlert } from "lucide-react";

const ExpiredSessionModal: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-xs w-full flex flex-col items-center">
          <TriangleAlert className="text-yellow-500 w-14 h-14" />
          <p className="text-center font-semibold text-xl ">Sesi Habis</p>
          <p className="font-medium text-center mt-2 text-sm">
            Silahkan login kembali
          </p>
        </div>
      </div>
    </>
  );
};

export { ExpiredSessionModal };
