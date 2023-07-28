import React from 'react'
import Camera from '../components/Camera'
import { Navigate } from 'react-router-dom'

function CapturePage() {
  const user = JSON.parse(localStorage.getItem('user'))
  
  if (!user) {
   return <Navigate replace to="/signin" />;
  }

  return (
    <>
      <Camera />
    </>
  )
}

export default CapturePage
