import { useEffect, useState } from "react";
import { getFiles, deleteFile } from "../../api/file.api";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    try {
      const res = await getFiles();
      setFiles(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []); // ✅ correct

  const handleDelete = async (id) => {
    try {
      await deleteFile(id);
      loadFiles();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading files...</p>;

  return (
    <ul>
      {files.length === 0 && <p>No files uploaded</p>}

      {files.map((file) => (
        <li key={file._id}>
          {file.originalName}
          <button onClick={() => handleDelete(file._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
