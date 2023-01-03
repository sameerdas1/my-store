import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';


import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJOaOe_pAowBoWwI7b3yRL6_-4h7mes2s",
    authDomain: "my-store-db-3e781.firebaseapp.com",
    projectId: "my-store-db-3e781",
    storageBucket: "my-store-db-3e781.appspot.com",
    messagingSenderId: "1091583153598",
    appId: "1:1091583153598:web:d43a3f217df771519b95ef"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

// unique to Google's configuration (for what they want)

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if userdata exists
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error){
                console.log('error creating the user', error.message);
            }
        }

        return userDocRef;

    };


    //if userdata doesn't exist



  
