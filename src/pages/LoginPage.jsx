import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/Firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../Context/Wrapper";

const LoginPage = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  let { isloading, userdata } = useData();
  // console.log(isloading, userdata);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    let { email, password } = formdata;
    setloader(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User data:", userData);
      } else {
        console.log("No additional user data found.");
      }
      setloader(false);
      setformdata({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setloader(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Google Sign-In */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 mb-5 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition text-sm font-medium text-gray-700 shadow-sm"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* OR divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={loginUser} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              name="email"
              onChange={handleOnChange}
              value={formdata.email}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              name="password"
              onChange={handleOnChange}
              value={formdata.password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          {!loader ? (
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          ) : (
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center font-semibold hover:opacity-90 transition">
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin"></span>
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to={`/signup`}
            className="text-pink-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
