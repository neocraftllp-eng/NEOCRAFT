// Official Firebase Authentication Configuration
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Replace with your Firebase Project configuration or Google Cloud Client ID
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForGoogleAuthInit",
  authDomain: "neocraftx.firebaseapp.com",
  projectId: "neocraftx-studio",
  storageBucket: "neocraftx-studio.appspot.com",
  messagingSenderId: "1084291849182",
  appId: "1:1084291849182:web:abcdef123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export async function loginWithFirebaseGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      name: user.displayName || user.email.split('@')[0],
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
      emailVerified: user.emailVerified
    };
  } catch (error) {
    console.error("Firebase Google Auth Error:", error);
    throw error;
  }
}

export async function logoutFirebase() {
  try {
    await signOut(auth);
  } catch (e) {}
}
