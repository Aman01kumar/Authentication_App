import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Transfer from "../components/account/Transfer";

const TransferPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <div className="p-10 flex-1 flex justify-center items-center">
          <Transfer />
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
