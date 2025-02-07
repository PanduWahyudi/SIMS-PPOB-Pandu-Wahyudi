import React, { useEffect } from "react";
import Navbar from "../navbar";
import { BalanceInfo } from "../balanceInfo";
import { UserProfile } from "../userProfile";
import ContentGuard from "../../hooks/contentGuard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProfile } from "../../store/slices/profileSlice";
import { fetchBalance } from "../../store/slices/balanceSlice";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  // Profile State
  const profile = useSelector((state: RootState) => state.profile.data);
  const isLoadingProfile = useSelector(
    (state: RootState) => state.profile.isLoading
  );
  // Balance State
  const { data: balance } = useSelector((state: RootState) => state.balance);
  const isLoadingBalance = useSelector(
    (state: RootState) => state.balance.isLoading
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <>
      <ContentGuard>
        <Navbar />
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex justify-between mt-6 ">
            {isLoadingProfile ? (
              <div>Loading profile...</div>
            ) : (
              profile && (
                <UserProfile
                  firstName={profile.first_name}
                  lastName={profile.last_name}
                  src={profile.profile_image}
                />
              )
            )}
            {isLoadingBalance ? (
              <div>Loading balance...</div>
            ) : (
              <BalanceInfo balance={balance} />
            )}
          </div>
          <div> {children}</div>
        </div>
      </ContentGuard>
    </>
  );
};

export default MainLayout;
