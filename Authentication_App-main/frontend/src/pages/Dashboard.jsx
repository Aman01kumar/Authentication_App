import Balance from "../components/account/Balance";
import Transfer from "../components/account/Transfer";
import UploadBox from "../components/files/UploadBox";
import FileList from "../components/files/FileList";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Balance />
      <Transfer />
      <UploadBox />
      <FileList />
    </div>
  );
};

export default Dashboard;
