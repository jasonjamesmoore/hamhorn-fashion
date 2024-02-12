import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBcokgVjW3_EmS5EPmw4Xds1qYZT1PUFbQ",
    authDomain: "hamhorn-fashion.firebaseapp.com",
    projectId: "hamhorn-fashion",
    storageBucket: "hamhorn-fashion.appspot.com",
    messagingSenderId: "566524172585",
    appId: "1:566524172585:web:f92a5055b8097183c7ff38"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
  

  if(!userSnapshot.exists()) {
    const{displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt,
      });
    } catch(error){
      console.log('error creating user', error.message);
    }
  }

  return userDocRef;
}
  // if user data exists
  // return userDocRef


    // if user data does not exist
    // create/set document with the data from the userAuth in my collection