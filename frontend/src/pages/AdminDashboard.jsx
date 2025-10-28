import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { uploadToSanity, deleteFromSanity, getSanityImageUrl, getSanityFileUrl } from '../utils/sanityUpload';

/**
 * Admin dashboard for uploading and managing assets
 */
const AdminDashboard = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadedAssets, setUploadedAssets] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    // Check if token exists and is not older than 24 hours
    if (!token || !loginTime || Date.now() - parseInt(loginTime) > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminLoginTime');
      navigate('/admin');
    }
  }, [navigate]);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    setError('');
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress({});

    try {
      const uploadPromises = files.map(async (file, index) => {
        try {
          setUploadProgress(prev => ({ ...prev, [index]: 0 }));
          
          const result = await uploadToSanity(file);
          
          setUploadProgress(prev => ({ ...prev, [index]: 100 }));
          
          return {
            file,
            result,
            index
          };
        } catch (error) {
          console.error(`Upload failed for file ${index}:`, error);
          throw error;
        }
      });

      const results = await Promise.all(uploadPromises);
      
      setUploadedAssets(prev => [...prev, ...results.map(r => r.result)]);
      setFiles([]);
      setSuccess(`Successfully uploaded ${results.length} file(s)`);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
      
    } catch (error) {
      setError(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const handleDeleteAsset = async (assetId) => {
    try {
      await deleteFromSanity(assetId);
      setUploadedAssets(prev => prev.filter(asset => asset.id !== assetId));
      setSuccess('Asset deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(`Delete failed: ${error.message}`);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setSuccess('URL copied to clipboard');
    setTimeout(() => setSuccess(''), 2000);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-creamBg">
      {/* Header */}
      <motion.div
        className="bg-white shadow-lg border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-signature text-3xl text-fashionRed">Hope Portfolio</h1>
              <p className="font-body text-black text-sm uppercase tracking-wide">Admin Dashboard</p>
            </div>
            <motion.button
              onClick={logout}
              className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors font-body"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Upload Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-fashion text-2xl text-fashionRed uppercase mb-6">Upload Assets</h2>
          
          {/* File Input */}
          <div className="mb-6">
            <label className="block text-sm font-body text-black mb-2 uppercase tracking-wide">
              Select Files (Images & Videos)
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-fashionRed transition-colors cursor-pointer"
            />
          </div>

          {/* Selected Files Preview */}
          {files.length > 0 && (
            <div className="mb-6">
              <h3 className="font-body text-lg text-black mb-4">Selected Files ({files.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {files.map((file, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-gray-100 rounded-lg p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="w-full h-24 bg-gray-300 rounded flex items-center justify-center mb-2">
                        <span className="text-2xl">🎥</span>
                      </div>
                    )}
                    <p className="text-xs font-body text-black truncate">{file.name}</p>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                    {uploadProgress[index] !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-fashionRed h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[index]}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Button */}
          <motion.button
            onClick={handleUpload}
            disabled={uploading || files.length === 0}
            className="w-full bg-fashionRed text-white py-3 px-6 rounded-lg font-body uppercase tracking-wide hover:bg-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: uploading ? 1 : 1.02 }}
            whileTap={{ scale: uploading ? 1 : 0.98 }}
          >
            {uploading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading...
              </div>
            ) : (
              `Upload ${files.length} File${files.length !== 1 ? 's' : ''} to Sanity`
            )}
          </motion.button>
        </motion.div>

        {/* Messages */}
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {success}
          </motion.div>
        )}

        {/* Uploaded Assets */}
        {uploadedAssets.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-fashion text-2xl text-fashionRed uppercase mb-6">Uploaded Assets</h2>
            <div className="space-y-4">
              {uploadedAssets.map((asset, index) => (
                <motion.div
                  key={asset.id || index}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      {asset.type === 'image' ? (
                        <img
                          src={getSanityImageUrl(asset.id, 64, 64)}
                          alt="Asset preview"
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-2xl">🎥</span>
                      )}
                    </div>
                    <div>
                      <p className="font-body text-black font-medium">{asset.originalFilename}</p>
                      <p className="font-body text-gray-500 text-sm">ID: {asset.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(
                        asset.type === 'image' 
                          ? getSanityImageUrl(asset.id)
                          : getSanityFileUrl(asset.id)
                      )}
                      className="px-3 py-1 bg-gray-200 text-black rounded text-sm hover:bg-gray-300 transition-colors"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

