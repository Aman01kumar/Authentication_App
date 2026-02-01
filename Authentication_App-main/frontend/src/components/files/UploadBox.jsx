import { uploadFile } from "../../api/file.api";

const UploadBox = () => {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await uploadFile(file);
      alert("File uploaded");
    } catch {
      alert("Upload failed");
    }
  };

  return <input type="file" onChange={handleUpload} />;
};

export default UploadBox;
