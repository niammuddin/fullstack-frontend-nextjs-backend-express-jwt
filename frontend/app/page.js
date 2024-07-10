"use client";

import { signIn } from 'next-auth/react';

const Home = () => {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to Home</h1>
        <button onClick={() => signIn()} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign in</button>
      </div>
    </div>
  );
};

export default Home;
