import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface BalanceInfoProps {
  balance?: number | null;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balance }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  // Fungsi untuk mendapatkan jumlah digit
  const getBalanceDigits = (balance: number | undefined | null) => {
    if (!balance) return 0;
    return balance.toString().replace(/\D/g, "").length;
  };

  // Render lingkaran sesuai jumlah digit
  const renderHiddenBalance = () => {
    const digitCount = getBalanceDigits(balance);
    return (
      <span className="flex items-center gap-1">
        {[...Array(digitCount)].map((_, index) => (
          <span
            key={index}
            className="w-2 h-2 bg-white rounded-full inline-block transition-all duration-300 ease-in-out"
          ></span>
        ))}
      </span>
    );
  };

  return (
    <div className="w-1/2 bg-danger rounded-xl text-white p-4 flex flex-col gap-4 justify-center">
      <p className="text-[13px]">Saldo anda</p>
      <p className="text-2xl leading-8 font-medium flex items-center gap-2">
        Rp{" "}
        <span className="transition-all duration-300 ease-in-out">
          {isBalanceVisible
            ? balance?.toLocaleString("id-ID")
            : renderHiddenBalance()}
        </span>
      </p>
      <div className="flex items-center space-x-2 text-[13px]">
        <p className="transition-all duration-300 ease-in-out">
          {isBalanceVisible ? "Tutup saldo" : "Lihat saldo"}
        </p>
        <button
          className="cursor-pointer transition-all duration-300 ease-in-out"
          onClick={toggleBalanceVisibility}
        >
          {isBalanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </div>
  );
};

export { BalanceInfo };
