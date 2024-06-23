import SentMessage from "../SentMessage/SentMessage";
import Header from "../shared/Header";
import WalletBalance from "../shared/WalletBalance";

const Sent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="md:my-14 mx-6 md:mx-0 my-8">
        <WalletBalance />
        <SentMessage />
      </div>
    </>
  );
};

export default Sent;
