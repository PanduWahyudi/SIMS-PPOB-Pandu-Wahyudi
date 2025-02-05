import { Link } from "react-router-dom";
import React from "react";
import { CircleX } from "lucide-react";
interface FailedModalProps {
  onBack: () => void;
  nominal: number;
  description?: string;
}

const FailedModal: React.FC<FailedModalProps> = ({
  onBack,
  nominal,
  description,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-xs w-full flex flex-col items-center">
          <CircleX className="text-danger w-14 h-14" />
          <p className="font-medium text-center mt-2 text-sm">{description}</p>
          <p className="text-center font-semibold text-xl ">
            Rp{nominal.toLocaleString("id-ID")}
          </p>
          <p className="mb-4 text-sm">gagal</p>
          <div className="flex flex-col space-y-3">
            <Link
              to="/beranda"
              onClick={onBack}
              className="text-danger font-semibold cursor-pointer text-sm"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { FailedModal };
