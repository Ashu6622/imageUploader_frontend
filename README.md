# Image Manager Frontend

A React-based web application for managing images and folders with a clean, intuitive interface.

## Features

- **User Authentication**: Login and signup with form validation
- **Dashboard**: Main interface for managing images and folders
- **Folder Management**: Create, navigate, and delete folders
- **Image Upload**: Drag-and-drop or click to upload images
- **Image Gallery**: Grid view with search functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Protected Routes**: Authentication-based navigation

## Tech Stack

- **Framework**: React 19.1.1
- **Routing**: React Router DOM 7.8.2
- **HTTP Client**: Axios 1.11.0
- **Styling**: CSS3 with custom components
- **Build Tool**: Create React App
- **Testing**: React Testing Library

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── logo.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx        # Login form
│   │   │   ├── Signup.jsx       # Registration form
│   │   │   └── Auth.css         # Auth styling
│   │   ├── Common/
│   │   │   ├── Header.jsx       # Navigation header
│   │   │   ├── Search.jsx       # Search component
│   │   │   └── Common.css       # Shared styling
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx    # Main dashboard
│   │   │   └── Dashboard.css    # Dashboard styling
│   │   ├── Folder/
│   │   │   ├── CreateFolder.jsx # Folder creation
│   │   │   ├── FolderView.jsx   # Folder display
│   │   │   └── Folder.css       # Folder styling
│   │   └── Image/
│   │       ├── ImageGrid.jsx    # Image gallery
│   │       ├── ImageUpload.jsx  # Upload component
│   │       └── Image.css        # Image styling
│   ├── services/
│   │   └── api.js               # API service layer
│   ├── utils/
│   │   └── auth.js              # Authentication utilities
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles
│   └── index.js                 # App entry point
├── .env                         # Environment variables
├── package.json
└── netlify.toml                 # Netlify deployment config
```

## Components Overview

### Authentication
- **Login**: Email/password authentication with validation
- **Signup**: User registration with username, email, password
- **Protected Routes**: Automatic redirection based on auth status

### Dashboard
- **Main Interface**: Central hub for all operations
- **Navigation**: Breadcrumb navigation for folder hierarchy
- **Actions**: Create folder, upload images, search functionality

### Folder Management
- **CreateFolder**: Modal for creating new folders
- **FolderView**: Display folders with navigation and delete options
- **Hierarchical Structure**: Support for nested folders

### Image Management
- **ImageUpload**: Drag-and-drop upload with progress indication
- **ImageGrid**: Responsive grid layout for image display
- **Search**: Real-time search across images
- **Delete**: Image deletion with confirmation

## API Integration

The frontend communicates with the backend through a centralized API service:

```javascript
// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Authentication APIs
authAPI.register(userData)
authAPI.login(credentials)
authAPI.getCurrentUser()

// Folder APIs
folderAPI.getFolders(parentId)
folderAPI.createFolder(folderData)
folderAPI.deleteFolder(id)

// Image APIs
imageAPI.uploadImage(formData)
imageAPI.getImages(folderId, search)
imageAPI.deleteImage(id)
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Create `.env` file with API URL
   - Update for development/production environments

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm start` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## Features in Detail

### Authentication Flow
1. User visits app → redirected to login if not authenticated
2. Login/Signup → JWT token stored in localStorage
3. Token automatically included in API requests
4. Auto-logout on token expiration (401 responses)

### File Upload
- Drag-and-drop interface
- Multiple file selection
- Progress indication
- File type validation (images only)
- Automatic folder assignment

### Search Functionality
- Real-time search as you type
- Searches across image names
- Maintains current folder context
- Clear search option

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## Deployment

### Netlify Deployment
The app includes `netlify.toml` configuration for easy deployment:

```toml
[build]
  base = "frontend"
  publish = "frontend/build"
  command = "cd frontend && CI=false npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Build Optimizations
- `CI=false` - Treats warnings as warnings, not errors
- `GENERATE_SOURCEMAP=false` - Reduces build size
- SPA routing support with redirects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

### Core Dependencies
- **react**: UI library
- **react-dom**: DOM rendering
- **react-router-dom**: Client-side routing
- **axios**: HTTP client

### Development Dependencies
- **react-scripts**: Build tooling
- **@testing-library/react**: Testing utilities
- **web-vitals**: Performance monitoring

## Performance Features

- Code splitting with React.lazy (if implemented)
- Image lazy loading
- Optimized bundle size
- Efficient re-rendering with React hooks