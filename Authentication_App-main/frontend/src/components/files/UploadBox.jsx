import { useState } from "react";
import { uploadFile } from "../../api/file.api";

const UploadBox = ({ refresh }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ File Select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ Upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      // ✅ Send FormData directly
      await uploadFile(formData);

      alert("File Uploaded Successfully!");

      setFile(null);

      refresh(); // reload dashboard data
    } catch (err) {
      console.log("Upload Error:", err.response?.data);

      alert(err.response?.data?.message || "Upload Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Upload File</h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border p-2 rounded-lg"
      />

      {file && (
        <p className="text-sm text-gray-600 mt-2">
          Selected: <b>{file.name}</b>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadBox;
