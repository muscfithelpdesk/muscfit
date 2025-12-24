'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import PropTypes from 'prop-types';

const FirebaseAuthContext = createContext({});

export const useFirebaseAuth = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within FirebaseAuthProvider');
  }
  return context;
};

export function FirebaseAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email/Password Sign Up
  const signUpWithEmail = async (email, password, displayName) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential?.user, { displayName });
      }
      
      return { success: true, user: userCredential?.user };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Email/Password Sign In
  const signInWithEmail = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential?.user };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Phone Authentication - Setup Recaptcha
  const setupRecaptcha = (containerId) => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          }
        });
      }
      return window.recaptchaVerifier;
    } catch (err) {
      setError(err?.message);
      throw err;
    }
  };

  // Phone Authentication - Send OTP
  const sendOTP = async (phoneNumber, recaptchaVerifier) => {
    try {
      setError(null);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      return { success: true, confirmationResult };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Phone Authentication - Verify OTP
  const verifyOTP = async (confirmationResult, code) => {
    try {
      setError(null);
      const result = await confirmationResult?.confirm(code);
      return { success: true, user: result?.user };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Sign Out
  const signOut = async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
      return { success: true };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    signUpWithEmail,
    signInWithEmail,
    setupRecaptcha,
    sendOTP,
    verifyOTP,
    signOut
  };

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

FirebaseAuthProvider.propTypes = {
  children: PropTypes?.node?.isRequired
};