import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import './Gallery.css'

function AdminGallery() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [photo, getphoto] = useState()
  const [update, setUpdate] = useState(false)
  const [error, getError] = useState()

  // Get admins album
  useEffect(() => {
    const handleClick = async () => {
      const res = await fetch("http://localhost:5000/auth/album-admin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      });// Get all img
      const data = await res.json();
      getphoto(data)
      getError(data)
    }
    handleClick()
  }, [update]);




  // Delete img from every user
  const handleDelate = async (pic) => {
    const reqUser = {
      email: user.email,
      img: pic,
      admin: user.role,
    };
    const res = await fetch("http://localhost:5000/auth/admindelete", {
      method: "DELETE",
      body: JSON.stringify(reqUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    });
    // refresh after delete
    const data = await res.json();
    if (data) {
      setUpdate(true)
    }
  }

  return (
    <>
      <section className='gallery-grid'>
        {photo && photo.map((pic, index) => (
          <article className="picture-article" key={index}>
            <span onClick={() => { handleDelate(pic); setUpdate(e => e.true) }} className="remove-image" >&#215;</span>
            <div className="overlay"></div>
            <img src={pic} alt="images" />
          </article>
        ))}
      </section>
      {error && error.length === 0 ?
        <section className='gallery-error'>
          <h1>
            Gallery is empty
          </h1>
        </section> : null
      }
    </>
  )
}

export default AdminGallery
