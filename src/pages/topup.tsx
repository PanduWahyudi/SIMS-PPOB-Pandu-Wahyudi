import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Input } from "../components/input";
import MainLayout from "../components/layouts/mainlayout";
import { useState } from "react";
import { ConfirmModal } from "../components/modals/confirmModal";
import { SuccessModal } from "../components/modals/succesModal";
import { FailedModal } from "../components/modals/failedModal";
import { Banknote, Loader2 } from "lucide-react";
import { axiosPrivateInstance } from "../utils/axiosInstance";

function TopUpPage() {
  const nominalTopUp: number[] = [10000, 20000, 50000, 100000, 250000, 500000];

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailedModal, setShowFailedModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const nominalValue = watch("nominal");

  const handleNominalClick = (nominal: number) => {
    setValue("nominal", nominal);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const response = await axiosPrivateInstance.post("/topup", {
        top_up_amount: data.nominal,
      });

      if (response.status === 200) {
        console.log(response.data);
        setShowSuccessModal(true);
      }
    } catch (erorr) {
      console.log(erorr);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainLayout>
        <div className="mt-[4%] flex flex-col gap-4">
          <div className="space-y-1">
            <p className="">Silahkan masukan</p>
            <h2 className="text-2xl font-semibold leading-6">Nominal Top Up</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex mt-[3%]"
          >
            <div className="flex flex-col space-y-4 w-[60%]">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Banknote className="w-5 h-5" />
                </div>
                <Input
                  className="border-neutral-200 pl-10 cursor-not-allowed disabled:text-black disabled:opacity-100"
                  disabled
                  placeholder="masukkan nominal top up"
                  value={
                    nominalValue
                      ? `${nominalValue.toLocaleString("id-ID")}`
                      : ""
                  }
                  {...register("nominal", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <Button
                type="button"
                onClick={() => setShowModal(true)}
                disabled={!nominalValue || nominalValue === 0 || isLoading}
                className="disabled:bg-slate-600 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  "Bayar"
                )}
              </Button>
            </div>

            <div className="w-[40%] grid grid-cols-3 gap-1 pl-3">
              {nominalTopUp.map((nominal) => (
                <button
                  key={nominal}
                  type="button"
                  onClick={() => handleNominalClick(nominal)}
                  className="w-32 h-9 text-sm shadow text-gray-600 rounded-xs border border-neutral-200 flex justify-center items-center cursor-pointer hover:bg-gray-100"
                >
                  Rp{nominal.toLocaleString("id-ID")}
                </button>
              ))}
            </div>
          </form>

          {/* Confirmation Pop Up */}
          {showModal && (
            <ConfirmModal
              description="Anda yakin untuk Top Up sebesar"
              confirmBtnText="Ya, lanjutkan Bayar"
              nominal={nominalValue}
              onCancel={() => setShowModal(false)}
              onConfirm={async () => {
                await handleSubmit(onSubmit)();
                setShowModal(false);
                setShowSuccessModal(true);
              }}
            />
          )}
          {/* Success Pop Up */}
          {showSuccessModal && (
            <SuccessModal
              description="Top Up sebesar"
              nominal={nominalValue}
              onBack={() => {
                setShowSuccessModal(false);
                reset();
              }}
            />
          )}
          {/* Failed Pop Up */}
          {showFailedModal && (
            <FailedModal
              description="Top Up sebesar"
              nominal={nominalValue}
              onBack={() => {
                setShowFailedModal(false);
                reset();
              }}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
}

export default TopUpPage;
