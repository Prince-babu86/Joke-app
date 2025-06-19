import React, { useState } from "react";
import { useData } from "../Context/Wrapper";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    post: "",
    imageUrl: "",
    caption: "",
  });

  const [loader, setloader] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  let { userdata, isloading } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloader(true)

    if (!formData.title || !formData.post || !formData.caption) {
      alert("Please fill in all required fields");
      return;
    }

    if (!userdata || !userdata.uid) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const newPost = {
        ...formData,
        createdAt: new Date(),
        userId: userdata.uid,
        username: userdata.username || "",
        name: userdata.name || "",
        email: userdata.email,
      };

      // 1. Add post to 'posts' collection
      const postRef = await addDoc(collection(db, "posts"), newPost);

      // 2. Add post summary to user's 'posts' array in users/{uid}
      const userDocRef = doc(db, "users", userdata.uid);
      await updateDoc(userDocRef, {
        posts: arrayUnion({
          postId: postRef.id,
          title: formData.title,
          caption: formData.caption,
          imageUrl: formData.imageUrl,
          post: formData.post,
          createdAt: new Date(),
        }),
      });

      // alert("Post created and linked to user successfully!");
      setloader(false)
      navigate("/")

      setFormData({
        title: "",
        post: "",
        imageUrl: "",
        caption: "",
      });
    } catch (error) {
      setloader(false)
      console.error("Error creating post:", error);
      // alert("Failed to create post.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Post *
            </label>
            <textarea
              name="post"
              value={formData.post}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Image URL (optional)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Caption *
            </label>
            <input
              type="text"
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {!loader ? <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Submit Post
          </button> : <button
            
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 flex items-center justify-center"
          >
            <span className="h-5 w-6 rounded-full border-3 border-t-transparent animate-spin"></span>
          </button>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
