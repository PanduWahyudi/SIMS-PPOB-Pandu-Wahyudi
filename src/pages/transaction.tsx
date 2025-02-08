import { Plus, Minus, Loader2 } from "lucide-react";
import MainLayout from "../components/layouts/mainlayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHistories,
  incrementOffset,
  resetState,
} from "../store/slices/historyTransactionSlice";
import { AppDispatch, RootState } from "../store";

function TransactionPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { histories, offset, hasMore, isLoading } = useSelector(
    (state: RootState) => state.transactions
  );
  const [isShowMoreLoading, setIsShowMoreLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchHistories(0));
  }, [dispatch]);

  const handleShowMore = async () => {
    setIsShowMoreLoading(true);
    const newOffset = offset + limit;
    dispatch(incrementOffset());
    await dispatch(fetchHistories(newOffset));
    setIsShowMoreLoading(false);
  };

  return (
    <MainLayout>
      <div className="mt-[4%] w-full ">
        <h1 className="text-xl font-semibold mb-2">Semua Transaksi</h1>
        {isLoading && offset === 0 && (
          <Loader2 className="w-8 h-8 animate-spin" />
        )}
        {histories.map((history) => (
          <div
            key={history.invoice_number}
            className="border border-neutral-200 p-2 rounded-xs flex justify-between items-center mb-2"
          >
            <div className="flex flex-col gap-1">
              <span
                className={`flex items-center space-x-1 ${
                  history.transaction_type === "TOPUP"
                    ? "text-teal-500"
                    : "text-danger"
                }`}
              >
                {history.transaction_type === "TOPUP" ? (
                  <Plus className="w-4 h-4" />
                ) : (
                  <Minus className="w-4 h-4" />
                )}
                <p className="font-medium text-lg">
                  Rp{history.total_amount.toLocaleString("id-ID")}
                </p>
              </span>
              <span className="text-xs text-slate-400 flex space-x-1">
                <p>
                  {new Date(history.created_on).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {new Date(history.created_on).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  WIB
                </p>
              </span>
            </div>
            <p className="text-sm font-medium">{history.description}</p>
          </div>
        ))}
        {hasMore && !isLoading && (
          <div className="flex justify-center my-4">
            <button
              onClick={handleShowMore}
              disabled={isShowMoreLoading}
              className="text-red-500 font-semibold text-sm cursor-pointer"
            >
              {isShowMoreLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Show More"
              )}
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default TransactionPage;
