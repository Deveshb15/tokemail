import AddMoney from "../AddMoney/AddMoney";
import WalletBalance from "../shared/WalletBalance";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const SendMoney = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="md:my-14 mx-6 md:mx-0 my-8">
        <WalletBalance />
        <AddMoney />
      </div>
      <Footer />
    </>
  );
};

export default SendMoney;
