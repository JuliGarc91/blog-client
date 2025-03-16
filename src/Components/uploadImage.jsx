import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

// Example upload function
const uploadImage = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  try {
    await uploadBytes(storageRef, file);
    console.log('File uploaded successfully!');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
