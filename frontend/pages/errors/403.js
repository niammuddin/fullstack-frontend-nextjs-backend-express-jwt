export default function Custom403() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <p className="text-xl text-gray-700 mt-4">Forbidden - You don't have permission to access this page.</p>
      <a href="/" className="mt-6 text-blue-500 hover:text-blue-700">
        Go back to Home
      </a>
    </div>
  );
}
