"use client"

import Navbar from '../../components/Navbar';
import withAuth from '../../hooks/withAuth';

const UserPage = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">User Page</h1>
        <p>Welcome to your User Page!</p>
      </div>
    </div>
  );
};

export default withAuth(UserPage, ['user', 'admin']);
