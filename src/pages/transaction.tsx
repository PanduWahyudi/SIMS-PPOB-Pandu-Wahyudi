import { Plus, Minus } from "lucide-react";
import MainLayout from "../components/layouts/mainlayout";
import { useEffect, useState } from "react";
import { axiosPrivateInstance } from "../axios/axios";

interface TransactionRecord {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

function TransactionPage() {
  const [histories, setHistories] = useState<TransactionRecord[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 5;

  useEffect(() => {
    const fetchHistories = async (offset: number) => {
      setIsLoading(true);
      try {
        const response = await axiosPrivateInstance.get(
          `/transaction/history?offset=${offset}&limit=${limit}`
        );
        setHistories(response.data.data.records);
        if (response.data.data.records.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistories(0); 
  }, [limit]);

  const handleShowMore = async () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    try {
      const response = await axiosPrivateInstance.get(
        `/transaction/history?offset=${newOffset}&limit=${limit}`
      );
      setHistories((prevHistories) => [
        ...prevHistories,
        ...response.data.data.records,
      ]);
      if (response.data.data.records.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data transactions:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="mt-[4%] w-full ">
          <h1 className="text-xl font-semibold mb-2">Semua Transaksi</h1>
          {isLoading && <p className="text-center">Loading...</p>}
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
                className="text-red-500 font-semibold text-sm cursor-pointer"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
}

export default TransactionPage;
