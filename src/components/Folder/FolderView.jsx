import React from 'react';
import './Folder.css';

const FolderView = ({ folders, onFolderClick, onDeleteFolder }) => {
  if (folders.length === 0) {
    return (
      <div className="empty-state">
        <p>No folders found. Create your first folder!</p>
      </div>
    );
  }

  return (
    <div className="folder-section">
      <h3 className="section-title">Folders</h3>
      <div className="folder-grid">
        {folders.map((folder) => (
          <div key={folder._id} className="folder-item">
            <div
              className="folder-content"
              onClick={() => onFolderClick(folder)}
            >
              <div className="folder-icon">📁</div>
              <span className="folder-name">{folder.name}</span>
            </div>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(folder._id);
              }}
              title="Delete folder"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderView;