import React, { useEffect } from "react";
import Navbar from "../navbar";
import { BalanceInfo } from "../balanceInfo";
import { UserProfile } from "../userProfile";
import ContentGuard from "../../hooks/contentGuard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProfile } from "../../store/slices/profileSlice";
import { fetchBalance } from "../../store/slices/balanceSlice";
import { Loader2 } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Profile State
  const { data: profile, isLoading: isLoadingProfile } = useSelector(
    (state: RootState) => state.profile
  );

  // Balance State
  const { data: balance, isLoading: isLoadingBalance } = useSelector(
    (state: RootState) => state.balance
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
              <Loader2 className="w-8 h-8 animate-spin" />
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
              <Loader2 className="w-8 h-8 animate-spin" />
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
