import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Input } from "../components/input";
import MainLayout from "../components/layouts/mainlayout";
import { useState } from "react";
import { ConfirmModal } from "../components/modals/confirmModal";
import { SuccessModal } from "../components/modals/succesModal";
import { FailedModal } from "../components/modals/failedModal";
import { Banknote } from "lucide-react";

function ServicePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailedModal, setShowFailedModal] = useState<boolean>(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      nominal: 0,
    },
  });

  const nominalValue = watch("nominal");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    setValue("nominal", numericValue);
  };

  const onSubmit = (data: FieldValues) => {
    console.log({
      ...data,
      nominal: Number(data.nominal),
    });

    setShowModal(false);
    setShowSuccessModal(true);
  };

  const formatDisplayValue = (value: number) => {
    if (!value) return "";
    return value.toLocaleString("id-ID");
  };

  return (
    <>
      <MainLayout>
        <div className="mt-[4%] flex flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-xl">Pembayaran</h2>
            <span className="flex space-x-4 items-center">
              <img
                className="w-6 h-6"
                src="/images/Listrik.png"
                alt="service"
              />
              <p className="font-semibold text-lg">PLN</p>
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Banknote className="w-5 h-5" />
              </div>
              <Input
                className="border-neutral-200 pl-10"
                value={formatDisplayValue(nominalValue)}
                {...register("nominal", { onChange: handleInputChange })}
              />
            </div>

            <Button
              type="button"
              onClick={() => setShowModal(true)}
              disabled={!nominalValue}
              className="disabled:bg-slate-600"
            >
              Bayar
            </Button>
          </form>

          {showModal && (
            <ConfirmModal
              description="Konfirmasi Pembayaran"
              confirmBtnText="Ya, lanjutkan Bayar"
              nominal={nominalValue}
              onCancel={() => setShowModal(false)}
              onConfirm={handleSubmit(onSubmit)}
            />
          )}

          {showSuccessModal && (
            <SuccessModal
              description="Ya ya"
              nominal={nominalValue}
              onBack={() => {
                setShowSuccessModal(false);
                reset();
              }}
            />
          )}

          {showFailedModal && (
            <FailedModal
              description="Ya ya"
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

export default ServicePage;
