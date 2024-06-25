import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full bg-light-white border-b-8 border-light-blue sm:py-8 sm:px-16 p-6">
      {children}
    </div>
  );
};

export default Card;
