import Logo from "../shared/Logo";
import ClaimDegen from "../ClaimDegen/ClaimDegen";

const Claim = () => {
  return (
    <div>
      <div className="py-6 md:py-0 border-b border-white border-opacity-20 w-full md:w-auto md:border-b-0 flex items-center justify-center">
        <Logo />
      </div>
      <div className="flex items-center justify-center md:my-14 mx-6 md:mx-0 my-8">
        <ClaimDegen />
      </div>
    </div>
  );
};

export default Claim;
