'use client';

import Navbar from '../components/Navbar';
import withAuth from '../hooks/withAuth';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl">Dashboard</h1>
        <p>Welcome to your Dashboard!</p>
      </div>
    </div>
  );
};

export default withAuth(Dashboard, ['user', 'admin']);
