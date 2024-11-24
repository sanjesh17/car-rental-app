const WaitingForDriver = ({ onDriverAccepted }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-center mb-2">
          Finding your driver...
        </h2>
        <p className="text-gray-600 text-center">
          Please wait while we connect you with a nearby driver
        </p>
      </div>
    </div>
  );
}; 