import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      alert("Google login cancelled or blocked");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: "url('/LoginImage.png')",
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* OPTIONAL OVERLAY FOR READABILITY */}
      <div className="absolute"/>

      {/* LOGIN FORM */}
      <div className="relative   z-10 min-h-screen flex items-center justify-start px-6 lg:px-20">
        <div className="w-full  shadow-2xl  max-w-md   rounded-2xl py-12 px-8 ">

          <h1 className="text-5xl mt-4 mb-4 font-bold text-gray-900">
            Login
          </h1>

          <p className="text-gray-600 mt-1">
            Workspace Management Dashboard
          </p>

          <p className="text-sm text-gray-400 mt-3 mb-8">
            Manage tasks, teams, and productivity from one place.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 font-bold bg-gray-100 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 font-bold bg-gray-100 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 font-bold bg-gray-100 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg
                         font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3
                       border border-gray-300 py-3 rounded-lg
                       font-medium hover:bg-gray-100 transition
                       disabled:opacity-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
