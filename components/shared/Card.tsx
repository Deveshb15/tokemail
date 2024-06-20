import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full  bg-white border-b-8 border-dark-purple sm:py-8 sm:px-16 p-6">
      {children}
    </div>
  );
};

export default Card;
