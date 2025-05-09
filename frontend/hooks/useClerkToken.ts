"use client";
// Custom hook to synchronize Clerk session JWT into localStorage
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

/**
 * On client-side, retrieves the Clerk session token and stores it in localStorage.
 * Backend uses this token from the Authorization header to authenticate requests.
 */
export function useClerkToken() {
  const { getToken, isSignedIn } = useAuth();
  useEffect(() => {
    async function fetchToken() {
      if (isSignedIn) {
        try {
          const token = await getToken();
          if (token) {
            localStorage.setItem('authToken', token);
          }
        } catch {
          localStorage.removeItem('authToken');
        }
      } else {
        localStorage.removeItem('authToken');
      }
    }
    fetchToken();
  }, [getToken, isSignedIn]);
}