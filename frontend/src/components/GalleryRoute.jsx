import React from 'react'
import AdminGallery from '../pages/AdminGallery'
import UserGallery from '../pages/UserGallery'
import { Navigate } from 'react-router-dom'

function GalleryRoute() {
  const user = JSON.parse(localStorage.getItem('user'))

  if (!user) {
    return (<Navigate replace to="/signin" />)
  }
  return (
    <>
      {user.role === "admin" ? <AdminGallery /> : <UserGallery />}
    </>
  )
}

export default GalleryRoute