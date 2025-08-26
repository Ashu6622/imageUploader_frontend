import React, { useState } from 'react';
import './Image.css';

const ImageUpload = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    name: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      return 'File size should be less than 10MB';
    }

    return null;
  };

  const processFile = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFormData(prev => ({
      ...prev,
      image: file
    }));

    // Auto-fill name from filename if not already filled
    if (!formData.name.trim()) {
      const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      setFormData(prev => ({
        ...prev,
        name: nameWithoutExtension,
        image: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Image name is required');
      return;
    }

    if (!formData.image) {
      setError('Please select an image file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onUpload({
        name: formData.name.trim(),
        image: formData.image
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading image');
      setLoading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setPreview(null);
    // Reset file input
    const fileInput = document.getElementById('imageFile');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Upload Image</h2>
          <button 
            className="modal-close" 
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            ✕
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageName">Image Name *</label>
            <input
              type="text"
              id="imageName"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter image name"
              required
              disabled={loading}
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageFile">Select Image *</label>
            <div 
              className={`file-drop-zone ${dragOver ? 'drag-over' : ''} ${formData.image ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!formData.image ? (
                <>
                  <input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    disabled={loading}
                    className="file-input-hidden"
                  />
                  <label htmlFor="imageFile" className="file-drop-label">
                    <div className="file-drop-icon">📁</div>
                    <div className="file-drop-text">
                      <strong>Click to select</strong> or drag and drop an image here
                    </div>
                    <div className="file-drop-hint">
                      Supports: JPG, PNG, GIF, WebP (Max: 10MB)
                    </div>
                  </label>
                </>
              ) : (
                <div className="file-selected">
                  <div className="file-info">
                    <span className="file-name">{formData.image.name}</span>
                    <span className="file-size">
                      ({(formData.image.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button 
                    type="button" 
                    className="remove-file-btn"
                    onClick={removeImage}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" className="preview-image" />
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="button secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button primary"
              disabled={loading || !formData.name.trim() || !formData.image}
            >
              {loading ? (
                <>
                  <span className="loading-spinner-small"></span>
                  Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;