// component to get one image url from cloudinary to display
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'your-cloud-name',
  api_key: 'your-api-key',
  api_secret: 'your-api-secret',
});

cloudinary.uploader.upload('path/to/your/image.jpg', function(result) {
  console.log(result);  // Contains the image URL
});