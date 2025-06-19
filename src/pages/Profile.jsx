import React from "react";
import { FaUserPlus, FaShareAlt , FaArrowLeft } from "react-icons/fa";
import { useData } from "../Context/Wrapper";
import { logoutUser } from "../api/Logout";

const ProfilePage = () => {
  const userData = {
    name: "Prince Babu",
    username: "princebabu",
    email: "prince@example.com",
    profileUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=FunnyFace",
    followers: 123,
    following: 76,
    posts: 3,
  };

  let { userdata } = useData();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-pink-100 to-purple-100 p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-10 -left-20 w-80 h-80 bg-pink-300 rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-purple-300 rounded-full opacity-20 blur-2xl animate-spin-slow" />

      <div className="max-w-3xl mx-auto z-10 relative">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4 mb-10">
          <img
            src={userData.profileUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-pink-400"
          />
          <h2 className="text-3xl font-bold text-purple-700">
            {userdata.name}
          </h2>
          <p className="text-sm text-gray-500">@{userdata.newusername}</p>
          <p className="text-xs text-gray-400">{userdata.email}</p>

          <div className="flex gap-8 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-pink-600">
                {userdata.posts && userdata.posts.length > 0 ? userdata.posts.length : 0}
              </p>
              <p className="text-xs text-gray-500">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-600">
                {userData.followers}
              </p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-orange-600">
                {userData.following}
              </p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={logoutUser} className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 flex items-center gap-2">
           <FaArrowLeft/>   Logout
            </button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 flex items-center gap-2">
              <FaShareAlt /> Share
            </button>
          </div>
        </div>

        {/* User Posts Grid */}
        <h3 className="text-2xl font-bold mb-4 text-purple-800">
          🖼 My Posts
        </h3>
       {userdata.posts && userdata.posts.length > 0 ?  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userdata.posts.map((post , id) => (
            <div 
              key={id}
              className="bg-white p-4 rounded-xl shadow-md border-l-4 border-pink-300"
            >
              <h4 className="text-lg font-semibold text-purple-700 mb-2">
                📝 {post.title}
              </h4>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="rounded-lg object-cover w-full h-40 mb-2"
                />
              )}
              <p className="text-sm text-gray-700">💬 {post.caption}</p>
            </div>
          ))}
        </div> : <h4>Add a post</h4>}
      </div>
    </div>
  );
};

export default ProfilePage;
