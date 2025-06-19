import React from 'react';
import { useData } from '../Context/Wrapper';

const MobileTopNavbar = ({ userData }) => {
  const funnyGreetings = [
    'Yo 👻',
    'Hola 🥸',
    'Wassup 🤪',
    'Heya 🐸',
    'Namaste 🙏',
    'Kya haal hai 😎',
  ];
  const randomGreeting = funnyGreetings[Math.floor(Math.random() * funnyGreetings.length)];

 let {userdata} =  useData()

  return (
    <div className="md:hidden bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 px-4 py-3 shadow-md flex items-center justify-between ">
      <div className="text-left">
        <h2 className="text-lg font-bold text-purple-800">{randomGreeting}, {userdata?.name || 'Guest'}!</h2>
        <p className="text-md text-pink-500 ">Welcome back to chaos 😈</p>
      </div>
      <img
        src={userdata?.profileUrl || 'https://api.dicebear.com/7.x/thumbs/svg?seed=RandomFunnyFace'}
        alt="profile"
        className="w-10 h-10 rounded-full border-2 border-pink-400 shadow-sm object-cover"
      />
    </div>
  );
};

export default MobileTopNavbar;
