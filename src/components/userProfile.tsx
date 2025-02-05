import React from "react";

interface UserProfileProps {
  firstName: string;
  lastName: string;
  src: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  firstName,
  lastName,
  src,
}) => {
  return (
    <>
      <div className="space-y-4">
        <div className="w-[100px] h-[100px] border-2 border-neutral-200 rounded-full overflow-hidden">
          <img
            src={src}
            alt={firstName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* <img src={src} alt={firstName} /> */}
        <div className="">
          <h2 className="text-lg">Selamat datang,</h2>
          <h1 className="text-2xl font-semibold leading-5">
            {firstName} {lastName}
          </h1>
        </div>
      </div>
    </>
  );
};

export { UserProfile };
