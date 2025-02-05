import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/mainlayout";
import { SliderBanner } from "../components/sliderBanner";
import useAxiosPrivateInstance from "../hooks/useAxiosPrivateInstance";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [banners, setBanners] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const axiosPrivateInstance = useAxiosPrivateInstance();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosPrivateInstance.get("/services");
        setServices(response.data.data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [axiosPrivateInstance]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosPrivateInstance.get("/banner");
        setBanners(response.data.data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      } finally {
        setLoadingBanners(false);
      }
    };

    fetchBanners();
  }, [axiosPrivateInstance]);

  return (
    <MainLayout>
      <div className="w-full mt-[4%] flex justify-between">
        {loadingServices ? (
          <p>Loading services...</p>
        ) : (
          services.map((service) => (
            <div
              key={service.service_code}
              className="w-14 flex flex-col gap-2"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-md flex items-center justify-center">
                <img src={service.service_icon} alt={service.service_name} />
              </div>
              <p className="text-center text-xs font-medium">
                {service.service_name}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="w-full mt-10">
        <h1 className="font-semibold">Temukan promo menarik</h1>
        <div className="mt-4">
          {loadingBanners ? (
            <p>Loading banners...</p>
          ) : (
            <SliderBanner banners={banners} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
