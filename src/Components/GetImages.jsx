import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.readonly";

const GoogleDriveGallery = () => {
  useEffect(() => {
    // Load the Google API client
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    });
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      console.log('User signed in');
    });
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log('User signed out');
    });
  };

  const getImagesFromDrive = () => {
    // Fetch images from Google Drive
    gapi.client.drive.files.list({
      q: "mimeType='image/jpeg' or mimeType='image/png'",
      fields: 'files(id, name, webViewLink)',
    }).then((response) => {
      const files = response.result.files;
      if (files && files.length > 0) {
        console.log('Files:', files);
      } else {
        console.log('No files found.');
      }
    });
  };

  return (
    <div>
      <h1>Google Drive Gallery</h1>
      <button onClick={handleLogin}>Login with Google</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={getImagesFromDrive}>Fetch Images</button>
    </div>
  );
};

export default GoogleDriveGallery;

// const getImagesFromDrive = () => {
//     gapi.client.drive.files.list({
//       q: "mimeType='image/jpeg' or mimeType='image/png'",
//       fields: 'files(id, name, webViewLink)',
//     }).then((response) => {
//       const files = response.result.files;
//       if (files && files.length > 0) {
//         setImages(files);  // Assuming you have a state to store images
//       } else {
//         console.log('No images found.');
//       }
//     });
//   };
  
//   const [images, setImages] = useState([]);
  
//   return (
//     <div>
//       <h1>Google Drive Gallery</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//       <button onClick={handleLogout}>Logout</button>
//       <button onClick={getImagesFromDrive}>Fetch Images</button>
//       <div>
//         {images.length > 0 ? (
//           images.map((image) => (
//             <img
//               key={image.id}
//               src={image.webViewLink}
//               alt={image.name}
//               width="200"
//               height="200"
//             />
//           ))
//         ) : (
//           <p>No images available</p>
//         )}
//       </div>
//     </div>
//   );