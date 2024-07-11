"use client";

import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find(row => row.startsWith('token='));
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        if (token) {
          try {
            const decodedUser = jwt.decode(token);
            setUser(decodedUser);
          } catch (err) {
            console.error('Failed to decode token', err);
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useAuth;
