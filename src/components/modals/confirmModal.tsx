import React from "react";

interface ConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  nominal: number;
  description?: string;
  confirmBtnText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onCancel,
  onConfirm,
  nominal,
  description,
  confirmBtnText,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-xs w-full flex flex-col items-center">
          <img
            className="h-10 w-10"
            src="/images/Logo.png"
            alt="confirm logo"
          />
          <p className="font-medium text-center mt-2 text-sm">{description}</p>
          <p className="text-center font-semibold text-xl mb-4">
            Rp{nominal.toLocaleString("id-ID")} ?
          </p>
          <div className="flex flex-col space-y-3 text-sm">
            <button
              type="button"
              onClick={onConfirm}
              className="text-danger font-semibold cursor-pointer"
            >
              {confirmBtnText}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="text-slate-400 font-semibold cursor-pointer"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { ConfirmModal };
