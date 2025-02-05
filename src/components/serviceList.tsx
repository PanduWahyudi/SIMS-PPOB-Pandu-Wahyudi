import React from "react";

interface ServiceListProps {
  image: string;
  name: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ image, name }) => {
  return (
    <>
      <div className=" w-14 flex flex-col  gap-2 ">
        <div className="bg-blue-100 w-full h-14 rounded-md flex items-center justify-center">
          <img src={image} alt={name} />
        </div>
        <p className="text-center text-xs">{name}</p>
      </div>
    </>
  );
};

export { ServiceList };
