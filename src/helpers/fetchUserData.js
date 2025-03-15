import { useEffect, useState } from 'react'
import { auth, db } from './firebase'  // Import your auth and db instances from your firebase config
import { onAuthStateChanged } from 'firebase/auth'  // To track auth state changes
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'; // Add getDoc import

const fetchUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Authenticated User:", user);
        const userDocRef = doc(db, 'users', user.uid);

        try {
          // Use getDoc() to retrieve the document
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            // If the document doesn't exist, create it
            await setDoc(userDocRef, {
              name: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              uid: user.uid,
            });
            console.log("User data successfully written to Firestore!");
          }
        } catch (error) {
          console.error("Error checking document:", error);
          setError(error.message); // Set the error message
        }

        // Listen to Firestore document updates
        const unsubscribeFirestore = onSnapshot(
          userDocRef,
          (docSnap) => {
            if (docSnap.exists()) {
              setUserData(docSnap.data()); // Set user data to state
            } else {
              setUserData(null); // If no document, clear the data
            }
            setLoading(false); // Done loading
          },
          (error) => {
            console.error("Error fetching user data: ", error);
            setError(error.message); // Set the error message
            setLoading(false); // Done loading even if error happens
          }
        );

        // Cleanup listener on component unmount or when the user changes
        return () => unsubscribeFirestore();
      } else {
        setUserData(null); // No user, clear data
        setLoading(false); // Done loading
      }
    });

    // Cleanup auth listener on component unmount
    return () => unsubscribeAuth();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return { userData, loading, error };
};

export default fetchUserData;
