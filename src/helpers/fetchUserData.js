// import { auth, db } from './firebase'
// import { doc, getDoc } from 'firebase/firestore'

// export const fetchUserData = () => {
//   return new Promise((resolve, reject) => {
//     //tracks current auth state in Firebase
//     auth.onAuthStateChanged(async (user) => {
//       console.log('user', user.uid)
//       if (user.uid) {
//         console.log('fetchUserData', user)

//         // retrieve the information from the Firestore DB
//         const docRef = doc(db, 'Users', user.uid)
//         try {
//           const docSnap = await getDoc(docRef)
//           console.log('docsnap', docSnap.data())
//           if (docSnap.exists()) {
//             resolve(docSnap.data())
//           } else {
//             reject(new Error('No user data found'))
//           }
//         } catch (error) {
//           reject(error)
//         }
//       } else {
//         reject(new Error('No user logged in'))
//       }
//     })
//   })
// }


// -------------------------------------------------------



import { useEffect, useState } from 'react'
import { auth, db } from './firebase'  // Import your auth and db instances from your firebase config
import { onAuthStateChanged } from 'firebase/auth'  // To track auth state changes
// import { doc, getDoc, onSnapshot } from 'firebase/firestore'  // To fetch and listen to Firestore data

// const fetchUserData = () => {
//   const [userData, setUserData] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Listen for auth state changes
//     const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // If the user is authenticated, fetch user data from Firestore
//         const userDocRef = doc(db, 'users', user.uid)
//         const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
//           if (docSnap.exists()) {
//             setUserData(docSnap.data())  // Set user data to state
//           }
//           setLoading(false)  // Done loading
//         },
        
//         // (error) => {
//         //   console.error("Error fetching user data: ", error)
//         //   setLoading(false)  // Done loading even if error happens
//         // }
      
//       )

//         // Cleanup listener on component unmount or when the user changes
//         return () => unsubscribeFirestore()
//       } else {
//         setUserData(null)  // No user, clear data
//         setLoading(false)  // Done loading
//       }
//     })

//     // Cleanup auth listener on component unmount
//     return () => unsubscribeAuth()
//   }, [])  // Empty dependency array ensures this effect runs once on mount

//   return { userData, loading }
// }

// export default fetchUserData

//------------------------------------------------------------------------

// import { useEffect, useState } from 'react';
// import { auth, db } from './firebase'; // Import your auth and db instances from your firebase config
// import { onAuthStateChanged } from 'firebase/auth'; // To track auth state changes
// import { doc, onSnapshot } from 'firebase/firestore'; // To fetch and listen to Firestore data

// const fetchUserData = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null); // State to track errors

//   useEffect(() => {
//     const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("Authenticated User:", user);
//         const userDocRef = doc(db, 'users', user.uid);
//         const unsubscribeFirestore = onSnapshot(
//           userDocRef,
//           (docSnap) => {
//             if (docSnap.exists()) {
//               setUserData(docSnap.data()); // Set user data to state
//             } else {
//               setUserData(null); // If no document, clear the data
//             }
//             setLoading(false); // Done loading
//           },
//           (error) => {
//             console.log("No user signed in");
//             console.error("Error fetching user data: ", error);
//             setError(error.message); // Set the error message
//             setLoading(false); // Done loading even if error happens
//           }
//         );

//         // Cleanup listener on component unmount or when the user changes
//         return () => unsubscribeFirestore();
//       } else {
//         setUserData(null); // No user, clear data
//         setLoading(false); // Done loading
//       }
//     });

//     // Cleanup auth listener on component unmount
//     return () => unsubscribeAuth();
//   }, []); // Empty dependency array ensures this effect runs once on mount

//   return { userData, loading, error };
// };

// export default fetchUserData;

//----------------------------------------

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
