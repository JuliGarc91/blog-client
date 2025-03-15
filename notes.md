# Firebase Auth Portfolio Project Example - Frontend

This is a client side login for Firebase. It includes the [login with email and password](https://firebase.google.com/docs/auth/web/password-auth) functionality and the [sign in with Google functionaility](https://firebase.google.com/docs/auth/web/google-signin) from Firebase.

This firebase refactor and scaffold is based on [The Debug Arena's implementation of firebase](https://www.youtube.com/watch?v=7jOq6SXBF-k)

It includes the use of [Firebase Firestore](https://firebase.google.com/docs/firestore) which is the NoSQL Database that can be added to Firebase projects.

Here is the [original REPO](https://github.com/the-debug-arena/Login-Auth-Firebase-ReactJS). The original project was created using `create-react-app` toolchain instead of `vite`

This refactor uses [vite](https://vitejs.dev/guide/)

## Note: You must manually configure your Firebase account

### TO DO:

- create your firebase web app
- set up and `Enable` authentication methods
  - Email/Password
  - Google
- add the Firebase Firestore NoSQL database
- change the `Rules` in your Firestore DB to

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

```

You are not required to use both Email/Password sign in and Google sign in. You can refactor the code to only use one or the other.

## User

The logged in user is automatically set in state in the `App.jsx` parent component.
This allows you to protect your routes using a ternary in your `element` attribute.

Do Not pass the user as a prop. Instead, Use the `fetchUserData` helper function in a `useEffect` in the component you are navigating to. This will allow you to `refresh` the page.

## FULLSTACK ADJUSTMENTS

You will need to adjust the code in the fetchUserData.js file to make a fetch call to the backend.

---

If you haven't created a Firestore database yet, but you're only using **Firebase Authentication**, then you're likely trying to work with **Authentication** features, not Firestore. The Firebase Authentication service doesn't need Firestore to work, as it handles authentication and user management separately.

### Here's how Firebase Authentication and Firestore are different:

- **Firebase Authentication**: Manages user sign-in/sign-up, including handling providers like Google, email/password, and more. It does **not** require Firestore unless you're saving additional user data.
  
- **Firestore**: A NoSQL cloud database that allows you to store and manage data. It's separate from Authentication, but you can use it together. For example, once users authenticate via Firebase, you might use Firestore to store additional user profile data (e.g., name, profile picture, etc.).

### If you are **only using Firebase Authentication** and don't need Firestore, here's what you need to know:

#### 1. **Firebase Authentication** Setup
If you're just using Firebase Authentication, there's no need to worry about Firestore rules. Authentication itself works based on Firebase's built-in methods (like `signInWithEmailAndPassword`, `signUpWithEmailAndPassword`, `signInWithGoogle`, etc.).

If you're logging in users and retrieving their basic info, that's enough for authentication. No Firestore is required unless you're storing extra data.

#### 2. **Firebase Authentication Only - No Firestore Needed**

If you're not using Firestore, you're only concerned with Authentication. Here's a general process:

- **Login with Firebase Authentication**:
  - When a user logs in via a method like Google, Email/Password, or any other supported provider, Firebase will give you a **user object**.
  - This object contains details like the user's email, display name, photo URL, UID, etc.

  Example code to handle authentication (using Google login):

  ```javascript
  import firebase from 'firebase/app';
  import 'firebase/auth';

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(googleProvider)
    .then((result) => {
      // The signed-in user info
      const user = result.user;
      console.log(user.email); // User's email
      console.log(user.displayName); // User's name
      console.log(user.photoURL); // User's profile picture
    })
    .catch((error) => {
      console.error(error);
    });
  ```

- **Authentication Data**:  
  You don’t need to store user data in Firestore unless you want to. Authentication data (like the user's email, name, etc.) is automatically managed by Firebase.

#### 3. **What If You Need to Store More Data?**

If you later want to store additional user data (like profile details or app-specific data), that's when you would use **Firestore** or **Realtime Database** to store that information. You can create a user document with the user's `uid` as the document ID, and then store any extra details (like name, photo, preferences, etc.).

Example (if you ever decide to use Firestore in the future):

```javascript
const db = firebase.firestore();
const userRef = db.collection('users').doc(firebase.auth().currentUser.uid);

userRef.set({
  firstName: 'John',
  lastName: 'Doe',
  photo: 'https://example.com/photo.jpg',
})
  .then(() => console.log('User data saved to Firestore'))
  .catch((error) => console.error('Error saving user data:', error));
```

In that case, you would need to use the **Firestore security rules** to protect the data.

---

### In Short:
- **If you are not using Firestore**, you don’t need Firestore rules.
- **Firebase Authentication** handles user authentication (sign-in, sign-up) on its own.
- **Firestore** is only necessary if you want to save or manage additional user data beyond what Firebase Authentication already provides.