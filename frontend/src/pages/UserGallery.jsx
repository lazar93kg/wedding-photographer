import React from 'react'
import './Gallery.css'
import { useState } from 'react';
import { useEffect } from 'react';

function GalleryPage() {
  const user = JSON.parse(localStorage.getItem('user'))
  const [photo, getphoto] = useState()
  const [error, getError] = useState()
  const [refresh, setrefresh] = useState(false)


  // Get users album
  useEffect(() => {
    const handleClick = async () => {
      const res = await fetch("http://localhost:5000/auth/album", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      });
      const data = await res.json();
      getphoto(data)
      getError(data)
    }
    handleClick()
  }, [refresh]);


// Delete img from user gallery
  const handleDelate = async (pic) => {
    const reqObj = {
      email: user.email,
      img: pic,
      admin: user.role,
    };
    const res = await fetch("http://localhost:5000/auth/deletephoto", {
      method: "DELETE",
      body: JSON.stringify(reqObj),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    });
    // refresh after delete
    const data = await res.json();
    if (data) {
      setrefresh(true)
    }
  }


  return (
    <>
      <section className='gallery-grid'>
        {photo && photo.map((pic, index) => (
          <article className="picture-article" key={index}>
            <a onClick={() => { handleDelate(pic); setrefresh(e => e.true) }} className="remove-image" >&#215;</a>
            <div className="overlay"></div>
            <img src={pic} alt="images" />
          </article>
        ))}
      </section>
      {error && error.length === 0 ?
        <div className='gallery-error'>
          <h1>
            Gallery is empty
          </h1>
        </div>
        : null}
    </>
  )
}

export default GalleryPage
