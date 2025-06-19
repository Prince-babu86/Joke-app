import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import {
  FaHeart,
  FaRegCommentDots,
  FaShareAlt,
  FaBookmark,
  FaUserPlus,
  FaEllipsisH,
} from "react-icons/fa";
import {db ,auth} from '../firebase/firebase.config'

const funnyAvatars = ["🐸", "🦄", "🧙‍♂️", "🦕", "🐼", "🐙", "🧛‍♀️", "🤡"];

const getRandomAvatar = () => {
  return funnyAvatars[Math.floor(Math.random() * funnyAvatars.length)];
};

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const [loader, setloader] = useState(false);

  const fetchPosts = async () => {
    setloader(true);
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      setloader(false);
    } catch (error) {
      setloader(false);
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-200 p-6">
      <h1 className="text-xl font-bold text-center text-purple-800 mb-10 drop-shadow-lg">
        📰 Welcome to LOLFeed — The Internet’s Most Questionable Feed 🎉
      </h1>

      {!loader ? (
        <div className="grid gap-6 max-w-xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No nonsense yet. Be the first to post chaos! 😈
            </p>
          ) : (
            posts.map((post, index) => (
              <div
                key={post.id}
                className="bg-white border-4 border-dashed border-pink-400 rounded-xl p-5 shadow-xl "
              >
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">{getRandomAvatar()}</span>
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {post.name || post.username || "Anonymous Hero"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted:{" "}
                      {new Date(post.createdAt?.toDate()).toLocaleString()}
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-pink-700 mb-2">
                  📝 {post.title}
                </h2>
                <p className="text-gray-700 mb-3">{post.post}</p>

                {post.imageUrl && (
                  <div className="rounded-lg overflow-hidden mb-3">
                    <img
                      src={post.imageUrl}
                      alt="post"
                      className="w-full object-cover rounded-xl"
                    />
                  </div>
                )}

                <p className="italic text-purple-600 mb-4">
                  💬 "{post.caption}"
                </p>

                <div className="flex justify-between items-center mt-2 text-gray-600 text-lg">
                  <div className="flex gap-4">
                    <button title="Like" className="hover:text-red-500">
                      <FaHeart />
                    </button>
                    <button title="Comment" className="hover:text-blue-500">
                      <FaRegCommentDots />
                    </button>
                    <button title="Share" className="hover:text-green-500">
                      <FaShareAlt />
                    </button>
                    <button title="Save" className="hover:text-yellow-500">
                      <FaBookmark />
                    </button>
                  </div>
                  <div className="flex gap-4">
                    <button title="Follow" className="hover:text-purple-600">
                      <FaUserPlus />
                    </button>
                    <button title="More" className="hover:text-black">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] w-full">
          <span className="w-6 h-6 rounded-full border-4 border-t-transparent border-gray-700 animate-spin"></span>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
