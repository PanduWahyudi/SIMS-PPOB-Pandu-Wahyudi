import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { BalanceInfo } from "../balanceInfo";
import { UserProfile } from "../userProfile";
import useAxiosPrivateInstance from "../../hooks/useAxiosPrivateInstance";
import ContentGuard from "../../hooks/contentGuard";

interface MainLayoutProps {
  children: React.ReactNode;
}
interface Profile {
  first_name: string;
  last_name: string;
  profile_image: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);
  const axiosPrivateInstance = useAxiosPrivateInstance();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivateInstance.get("/profile");
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [axiosPrivateInstance]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axiosPrivateInstance.get("/balance");
        setBalance(response.data.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchBalance();
  }, [axiosPrivateInstance]);

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
