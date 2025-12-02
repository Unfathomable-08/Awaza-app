// utils/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// ============== Sign Up ==============
export const signUp = async (
  email: string,
  password: string,
  displayName?: string
) => {
  if (!auth) throw new Error("Firebase auth not initialized");

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Set display name
  if (displayName && user) {
    await updateProfile(user, { displayName });
  }

  // Send verification email
  await sendEmailVerification(user, {
    url: "http://localhost:8081", // Change this to your app's link
    // For mobile (Expo), use your deep link, e.g.:
    // url: "exp://192.168.1.xxx:8081/--/finish-signup"
    // or better: use your published Expo URL or custom domain
  });

  return user;
};

// ========== Send Verification Email Again ==========
export const resendVerificationEmail = async () => {
  if (!auth?.currentUser) throw new Error("No user logged in");
  if (auth?.currentUser.emailVerified)
    throw new Error("Email already verified");

  await sendEmailVerification(auth.currentUser, {
    url: "http://localhost:8081",
  });
};

// ============== Sign In ==============
export const signIn = async (email: string, password: string) => {
  if (!auth) throw new Error("Firebase auth not initialized");

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  // Check if email is verified
  if (!user.emailVerified) {
    resendVerificationEmail();
    throw new Error('EMAIL_NOT_VERIFIED');
  }

  return user;
};

// ============== Sign Out ==============
export const logOut = async () => {
  if (auth) {
    await signOut(auth);
  }
};