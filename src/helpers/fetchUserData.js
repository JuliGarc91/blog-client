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
import { useEffect, useState } from 'react'
import { auth, db } from './firebase'  // Import your auth and db instances from your firebase config
import { onAuthStateChanged } from 'firebase/auth'  // To track auth state changes
import { doc, getDoc, onSnapshot } from 'firebase/firestore'  // To fetch and listen to Firestore data

const fetchUserData = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If the user is authenticated, fetch user data from Firestore
        const userDocRef = doc(db, 'users', user.uid)
        const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data())  // Set user data to state
          }
          setLoading(false)  // Done loading
        })

        // Cleanup listener on component unmount or when the user changes
        return () => unsubscribeFirestore()
      } else {
        setUserData(null)  // No user, clear data
        setLoading(false)  // Done loading
      }
    })

    // Cleanup auth listener on component unmount
    return () => unsubscribeAuth()
  }, [])  // Empty dependency array ensures this effect runs once on mount

  return { userData, loading }
}

export default fetchUserData
