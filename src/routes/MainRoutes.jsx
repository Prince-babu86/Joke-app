import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import Home from '../pages/Home'
import ProtectedRoute from './ProtectedRoute'
import Create from '../pages/Create'
import Profile from '../pages/Profile'

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignupPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>

          
        } />


         <Route path='/create' element={
          <ProtectedRoute>
            <Create/>
          </ProtectedRoute>
        } />

        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        } />


      </Routes>
    </div>
  )
}

export default MainRoutes