"use client"

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import withAuth from '../hooks/withAuth';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const AdminPage = () => {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        if (!session) {
          throw new Error('No session found');
        }
        const response = await axios.get(`${apiUrl}/admin`, {
          headers: {
            'x-access-token': session.accessToken,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">Admin Page</h1>
        <p>Welcome to your Admin Page!</p>
        <div>
          {data && (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(AdminPage, ['admin']);
