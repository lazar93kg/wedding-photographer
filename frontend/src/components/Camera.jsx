import './Camera.css'
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";


const Camera = () => {
  // user from localStorage
  const user = JSON.parse(localStorage.getItem('user'))

  // Webcam from React
  const webcamRef = useRef(null);
  const [imgCap, setImgCap] = useState(null);

  // Getting image
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot({ width: 320, height: 240 });
    setImgCap(imageSrc);
  }, [webcamRef, setImgCap]);

  const handleClick = async () => {
    // Send image to db
    const userImage = {
      email: user.email,
      img: imgCap,
      token: user.token
    };
    // Request
    const URL = 'http://localhost:5000/auth/upload'
    await fetch(URL, {
      method: "POST",
      body: JSON.stringify(userImage),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }
    });
    setImgCap()
  }
  return (
    <article className="webcam-container">
      {imgCap && imgCap ? (
      <>
        <img className="img-popup" width={'620px'} src={imgCap} alt='img' />
        <button className='btn-capture' onClick={handleClick}>Add to Gallery</button>
      </>
      ) : 
      <>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        <br /> <button className='btn-capture' onClick={capture}>Capture photo</button>
      </>
      }
    </article>
  );
};

export default Camera;