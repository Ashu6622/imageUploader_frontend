import React from 'react';
import './Image.css';

// Get the base URL without /api for static files
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const STATIC_BASE_URL = API_BASE_URL.replace('/api', '');

const ImageGrid = ({ images, onDeleteImage }) => {
  if (images.length === 0) {
    return (
      <div className="empty-state">
        <p>No images found. Upload your first image!</p>
      </div>
    );
  }

  return (
    <div className="image-section">
      <h3 className="section-title">Images ({images.length})</h3>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image._id} className="image-item">
            <div className="image-container">
              <img
                src={`${STATIC_BASE_URL}${image.url}`}
                alt={image.name}
                className="image-thumbnail"
                loading="lazy"
                onError={(e) => {
                  console.error('Image failed to load:', `${STATIC_BASE_URL}${image.url}`);
                  e.target.style.display = 'none';
                }}
              />
              <div className="image-overlay">
                <button
                  className="delete-image-button"
                  onClick={() => onDeleteImage(image._id)}
                  title="Delete image"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="image-info">
              <p className="image-name" title={image.name}>
                {image.name}
              </p>
              <p className="image-size">
                {(image.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="image-date">
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;