"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  loading: boolean;
  hasuraToken: string | null;
  setHasuraToken: (token: string | null) => void; // function to update the stored Hasura JWT
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authToken: null,
  loading: true,
  hasuraToken: null,
  setHasuraToken: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasuraToken, setHasuraToken] = useState<string | null>(null);

  useEffect(() => {
    console.log("Setting up Firebase auth state observer.");
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("The user auth state changed:", user);
      if (user) {
        const token = await user.getIdToken();
        console.log("User is signed in, new token:", token);
        setUser(user);
        setAuthToken(token);
      } else {
        console.log("User is signed out.");
        setUser(null);
        setAuthToken(null);
      }
      setLoading(false);
    });

    return () => {
      console.log("Unsubscribing Firebase auth state observer.");
      unsubscribe();
    };
  }, []);

  const handleSetHasuraToken = useCallback((token: string | null) => {
    console.log("Updating Hasura JWT:", token);
    setHasuraToken(token);
  }, []);

  // Debugging context values every time they change
  useEffect(() => {
    console.log("AuthContext state changed:", {
      user,
      authToken,
      hasuraToken,
      loading,
    });
  }, [user, authToken, hasuraToken, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authToken,
        hasuraToken,
        setHasuraToken: handleSetHasuraToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
