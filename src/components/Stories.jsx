import React from 'react';

// Sample story data
const stories = [
  { username: 'prince_babu', image: 'https://i.pravatar.cc/150?img=12' },
  { username: 'jessica', image: 'https://i.pravatar.cc/150?img=20' },
  { username: 'aditya', image: 'https://i.pravatar.cc/150?img=17' },
  { username: 'riya_k', image: 'https://i.pravatar.cc/150?img=30' },
  { username: 'vaibhav', image: 'https://i.pravatar.cc/150?img=22' },
  { username: 'simran', image: 'https://i.pravatar.cc/150?img=28' },
];

const Stories = () => {
  return (
    <div className="bg-white w-[80%] p-4 ml-12 rounded-lg shadow-sm mb-4 overflow-x-auto">
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
        {stories.map((story, index) => (
          <div key={index} className="flex flex-col items-center w-20">
            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] rounded-full">
              <img
                src={story.image}
                alt={story.username}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
            </div>
            <p className="text-xs mt-1 text-center truncate w-full">{story.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
