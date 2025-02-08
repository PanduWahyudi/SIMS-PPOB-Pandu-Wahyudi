import { useEffect } from "react";
import MainLayout from "../components/layouts/mainlayout";
import { SliderBanner } from "../components/sliderBanner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBanners } from "../store/slices/bannerSlice";
import { fetchServices } from "../store/slices/serviceSlice";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: banners, isLoading: loadingBanners } = useSelector(
    (state: RootState) => state.banner
  );
  const { data: services, loading: loadingServices } = useSelector(
    (state: RootState) => state.service
  );

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="w-full mt-[4%] flex justify-between">
        {loadingServices ? (
          <p>Loading services...</p>
        ) : (
          services.map((service) => (
            <button
              key={service.service_code}
              className="w-14 flex flex-col gap-2 cursor-pointer items-center"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-md flex items-center justify-center">
                <img src={service.service_icon} alt={service.service_name} />
              </div>
              <p className="text-center text-xs font-medium">
                {service.service_name}
              </p>
            </button>
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
