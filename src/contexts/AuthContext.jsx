'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;

      if (currentUser) {
        // Sync profile metadata to database if it's a new login/signup
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (!profile && currentUser.user_metadata?.full_name) {
          await supabase.from('profiles').upsert({
            id: currentUser.id,
            name: currentUser.user_metadata.full_name,
            email: currentUser.email,
            updated_at: new Date(),
          });
        }
      }

      setUser(currentUser);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Sign up with email and password
  const signUp = async (email, password, fullName) => {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      setError(null);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: '',
          },
        },
      });

      if (signUpError) throw signUpError;

      return { success: true, data };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      setError(null);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      return { success: true, data };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      return { success: true };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      setError(null);
      const { data, error: updateError } = await supabase.auth.updateUser({
        data: updates,
      });

      if (updateError) throw updateError;

      return { success: true, data };
    } catch (err) {
      setError(err?.message);
      return { success: false, error: err?.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
