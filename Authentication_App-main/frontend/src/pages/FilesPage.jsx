import DashboardLayout from "../components/layout/DashBoardLayout";
import Files from "../components/files/FileList"; // or your Files.jsx

const FilesPage = () => {
  return (
    <DashboardLayout>
      <Files />
    </DashboardLayout>
  );
};

export default FilesPage;
