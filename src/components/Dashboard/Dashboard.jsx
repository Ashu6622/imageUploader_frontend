import React, { useState, useEffect } from 'react';
import Header from '../Common/Header';
import Search from '../Common/Search';
import FolderView from '../Folder/FolderView';
import CreateFolder from '../Folder/CreateFolder';
import ImageUpload from '../Image/ImageUpload';
import ImageGrid from '../Image/ImageGrid';
import { folderAPI, imageAPI } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([{ name: 'Home', id: null }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    loadFolderContents();
  }, [currentFolder, searchTerm]);

  const loadFolderContents = async () => {
    setLoading(true);
    try {
      const [foldersResponse, imagesResponse] = await Promise.all([
        folderAPI.getFolders(currentFolder),
        imageAPI.getImages(currentFolder, searchTerm)
      ]);

      setFolders(foldersResponse.data);
      setImages(imagesResponse.data);
    } catch (error) {
      console.error('Error loading folder contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = async (folder) => {
    setCurrentFolder(folder._id);
    
    // Update breadcrumb
    const newBreadcrumb = [...breadcrumb, { name: folder.name, id: folder._id }];
    setBreadcrumb(newBreadcrumb);
    setSearchTerm(''); // Clear search when navigating
  };

  const handleBreadcrumbClick = (index) => {
    const selectedCrumb = breadcrumb[index];
    setCurrentFolder(selectedCrumb.id);
    
    // Update breadcrumb to only include items up to selected index
    setBreadcrumb(breadcrumb.slice(0, index + 1));
    setSearchTerm(''); // Clear search when navigating
  };

  const handleCreateFolder = async (folderData) => {
    try {
      await folderAPI.createFolder({
        ...folderData,
        parentFolder: currentFolder
      });
      setShowCreateFolder(false);
      loadFolderContents();
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  };

  const handleUploadImage = async (imageData) => {
    try {
      const formData = new FormData();
      formData.append('name', imageData.name);
      formData.append('image', imageData.image);
      if (currentFolder) {
        formData.append('folderId', currentFolder);
      }

      await imageAPI.uploadImage(formData);
      setShowImageUpload(false);
      loadFolderContents();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      try {
        await folderAPI.deleteFolder(folderId);
        loadFolderContents();
      } catch (error) {
        console.error('Error deleting folder:', error);
        alert(error.response?.data?.message || 'Error deleting folder');
      }
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await imageAPI.deleteImage(imageId);
        loadFolderContents();
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image');
      }
    }
  };

  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="breadcrumb">
            {breadcrumb.map((crumb, index) => (
              <span key={index} className="breadcrumb-item">
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className="breadcrumb-link"
                >
                  {crumb.name}
                </button>
                {index < breadcrumb.length - 1 && (
                  <span className="breadcrumb-separator"> / </span>
                )}
              </span>
            ))}
          </div>

          <div className="dashboard-actions">
            <button
              onClick={() => setShowCreateFolder(true)}
              className="action-button primary"
            >
              New Folder
            </button>
            <button
              onClick={() => setShowImageUpload(true)}
              className="action-button primary"
            >
              Upload Image
            </button>
          </div>
        </div>

        <Search
          onSearch={setSearchTerm}
          placeholder="Search images in current folder..."
        />

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="dashboard-grid">
            <FolderView
              folders={folders}
              onFolderClick={handleFolderClick}
              onDeleteFolder={handleDeleteFolder}
            />
            <ImageGrid
              images={images}
              onDeleteImage={handleDeleteImage}
            />
          </div>
        )}
      </div>

      {showCreateFolder && (
        <CreateFolder
          onClose={() => setShowCreateFolder(false)}
          onCreate={handleCreateFolder}
        />
      )}

      {showImageUpload && (
        <ImageUpload
          onClose={() => setShowImageUpload(false)}
          onUpload={handleUploadImage}
        />
      )}
    </div>
  );
};

export default Dashboard;