import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Stories from '../components/Stories'
import Feed from '../components/Feed'
import { useData } from '../Context/Wrapper'

const Home = () => {
 
 let {isloading , userdata} =  useData()
//  console.log(isloading,userdata);
  return (
    <div>
      <Navbar/>
        {/* <Stories/> */}
        <Feed/>
        {/* <Navbar/> */}
        {/* <Sidebar/> */}
    </div>
  )
}

export default Home