import React, {useState} from "react";

const AuthModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleModal = () => setIsOpen(!isOpen);
  const switchAuthMode = () => setIsSignUp(!isSignUp);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h3>
          <div className="mt-2 px-7 py-3">
            <form>
              {isSignUp && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <p className="mt-4">
              <button onClick={switchAuthMode} className="text-blue-500">
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
              <button onClick={toggleModal} className="text-red-500 ml-4">
                Close
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModel;
