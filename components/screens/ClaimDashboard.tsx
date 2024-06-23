import TransactionHistory from "../TransactionHistory/TransactionHistory";
import Header from "../shared/Header";
import ClaimWalletBalance from "../shared/ClaimWalletBalance";

const ClaimDashboard = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="md:my-14 mx-6 md:mx-0 my-8">
        <ClaimWalletBalance dashboard />
        <TransactionHistory />
      </div>
    </>
  );
};

export default ClaimDashboard;
