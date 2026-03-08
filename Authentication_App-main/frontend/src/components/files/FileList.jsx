import { useState, useRef, useEffect } from "react";

const Files = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const saved = localStorage.getItem("gemini_files_v1");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "1770405398068-923252178.pdf", size: "2.4 MB", date: "Feb 6, 2026", type: "pdf" },
      { id: 2, name: "financial-report-2025.xlsx", size: "1.8 MB", date: "Feb 5, 2026", type: "excel" },
      { id: 3, name: "tax-documents.zip", size: "5.2 MB", date: "Feb 3, 2026", type: "zip" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("gemini_files_v1", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setUploading(true);
      setTimeout(() => {
        const newFile = {
          id: Date.now(),
          name: selectedFile.name,
          size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          type: selectedFile.name.split('.').pop().toLowerCase()
        };

        setUploadedFiles(prev => [newFile, ...prev]);
        setUploading(false);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 2000);
    }
  };

  const deleteFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const getFileIcon = (type) => {
    const iconClass = "w-8 h-8";
    switch (type) {
      case 'pdf':
        return <svg className={`${iconClass} text-red-500`} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      case 'excel':
      case 'xlsx':
        return <svg className={`${iconClass} text-green-500`} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      case 'zip':
        return <svg className={`${iconClass} text-purple-500`} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
      default:
        return <svg className={`${iconClass} text-gray-500`} fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">File Manager</h1>
          <p className="text-gray-600">Upload and manage your documents securely</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload File</h2>
                <p className="text-sm text-gray-500">Max size: 10MB</p>
              </div>

              <div className="mb-6">
                <label className="relative block">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                    <svg className="w-12 h-12 text-indigo-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 mb-1 truncate px-2">
                      {selectedFile ? selectedFile.name : 'Click to browse'}
                    </p>
                    <p className="text-xs text-gray-500">or drag and drop</p>
                  </div>
                </label>
              </div>

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                  !selectedFile || uploading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-105 shadow-md'
                }`}
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : "Upload File"}
              </button>
            </div>
          </div>

          {/* Files List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Uploaded Files</h2>
              </div>

              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all border border-gray-100 group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{file.name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => deleteFile(file.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {uploadedFiles.length === 0 && (
                  <div className="text-center py-16">
                    <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No files yet</h3>
                    <p className="text-gray-500">Upload your first file to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;