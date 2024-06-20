import Header from "../shared/Header";
import WalletBalance from "../shared/WalletBalance";
import Footer from "../shared/Footer";
import Confirmation from "../Confirmation/Confirmation";

const Confirm = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="md:my-14 mx-6 md:mx-0 my-8">
        <WalletBalance />
        <Confirmation />
      </div>
      <Footer />
    </>
  );
};

export default Confirm;
