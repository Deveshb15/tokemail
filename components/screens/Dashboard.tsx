import TransactionHistory from "../TransactionHistory/TransactionHistory";
import Header from "../shared/Header";
import WalletBalance from "../shared/WalletBalance";

const Dashboard = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="md:my-14 mx-6 md:mx-0 my-8">
        <WalletBalance dashboard />
        <TransactionHistory />
      </div>
    </>
  );
};

export default Dashboard;
