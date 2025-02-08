import { FieldValues, useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Input } from "../components/input";
import MainLayout from "../components/layouts/mainlayout";
import { useState, useEffect } from "react";
import { ConfirmModal } from "../components/modals/confirmModal";
import { SuccessModal } from "../components/modals/succesModal";
import { FailedModal } from "../components/modals/failedModal";
import { Banknote, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { axiosPrivateInstance } from "../utils/axiosInstance";

function ServicePage() {
  const location = useLocation();
  const selectedService = location.state?.selectedService;

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailedModal, setShowFailedModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      nominal: selectedService?.service_tariff || 0,
      service_code: selectedService?.service_code || "",
      service_name: selectedService?.service_name || "",
      service_icon: selectedService?.service_icon || "",
    },
  });

  const nominalValue = watch("nominal");
  const serviceName = watch("service_name");
  const serviceIcon = watch("service_icon");

  useEffect(() => {
    if (selectedService) {
      setValue("nominal", selectedService.service_tariff);
      setValue("service_code", selectedService.service_code);
      setValue("service_name", selectedService.service_name);
      setValue("service_icon", selectedService.service_icon);
    }
  }, [selectedService, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, "");
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    setValue("nominal", numericValue);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsLoading(true);
      const response = await axiosPrivateInstance.post("/transaction", {
        service_code: data.service_code,
      });

      if (response.status === 200) {
        console.log(response.data);
        setShowModal(false);
        setShowSuccessModal(true);
      }
    } catch (erorr) {
      setShowFailedModal(true);
      console.log(erorr);
    } finally {
      setIsLoading(false);
    }
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
              <img className="w-6 h-6" src={serviceIcon} alt={serviceName} />
              <p className="font-semibold text-lg">{serviceName}</p>
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
              disabled={!nominalValue || nominalValue == 0 || isLoading}
              className="disabled:bg-slate-600"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : (
                "Bayar"
              )}
            </Button>
          </form>

          {showModal && (
            <ConfirmModal
              description={`Bayar ${serviceName.toLowerCase()} senilai`}
              confirmBtnText="Ya, lanjutkan Bayar"
              nominal={nominalValue}
              onCancel={() => setShowModal(false)}
              onConfirm={handleSubmit(onSubmit)}
            />
          )}

          {showSuccessModal && (
            <SuccessModal
              description={`Pembayaran ${serviceName.toLowerCase()} senilai`}
              nominal={nominalValue}
              onBack={() => {
                setShowSuccessModal(false);
                reset();
              }}
            />
          )}

          {showFailedModal && (
            <FailedModal
              description={`Pembayaran ${serviceName.toLowerCase()} senilai`}
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
