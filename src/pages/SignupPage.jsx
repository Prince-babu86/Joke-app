import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase.config";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formdata, setformdata] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image:""
  });

  const [loader, setloader] = useState(false);
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setloader(true);
    let { name, email, password, username , image } = formdata;
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCred.user.uid;
      const newusername = username+Math.floor(Math.random()*299)
      

      await setDoc(doc(db, "users", uid), {
        name,
        newusername,
        email,
        uid,
        image
        
      });
      console.log("User created sucessfully");
      setloader(false);
      navigate("/")

      setformdata({
        name: "",
        username: "",
        email: "",
        password: "",
        image:""
      });
    } catch (error) {
      console.log(error.message);
      setloader(false);
       setformdata({
        name: "",
        username: "",
        email: "",
        password: "",
        image:""
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

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

        <form method="post" onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Full Name
            </label>
            <input
            required
              onChange={handleOnChange}
              value={formdata.name}
              type="text"
              placeholder="John Doe"
              name="name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Username
            </label>
            <input
              onChange={handleOnChange}
              value={formdata.name}
              type="text"
              placeholder="johndoe123"
              name="username"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Image
            </label>
            <input
              onChange={handleOnChange}
              value={formdata.image}
              type="text"
              placeholder="https://i.pinimg.com/736x/a3/9f/53/a39f5395026301178796976225fb6d2f.jpg"
              name="image"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              onChange={handleOnChange}
              value={formdata.email}
              type="email"
              placeholder="you@example.com"
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
            required
              onChange={handleOnChange}
              value={formdata.password}
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 outline-none transition"
            />
          </div>

          {!loader ? (
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          ) : (
            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center font-semibold hover:opacity-90 transition">
              <span className="h-4 w-4 rounded-full border-2 border-t-transparent animate-spin"></span>
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={`/login`}  className="text-pink-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
