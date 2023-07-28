import './Sign.css'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";


function SignInPage() {
    // Get values from inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()


  // Sign in ath
  const handleSubmit = async (e) => {
    e.preventDefault()
    const inputData = {
      email: email,
      password: password,
    }
    const URL = 'http://localhost:5000/user/signin'
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: { "Content-Type": "application/json" },
    });

    const jsonData = await res.json();
    if (res.ok) {
      // Login Successful
      localStorage.setItem('user', JSON.stringify(jsonData))
      window.location.reload(false);
    } else {
      setError(jsonData)
    }
  }
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'))
  if(user){
    return <Navigate replace to="/" />
  }

  return (
    <>
      <section className="form-flex">
        <section className="form-wrapper">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required />
            <label htmlFor="password"></label>
            <input
              type="password"
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='password'
              required />
            <button className='button-sign'>Sign in</button>
          </form>
          {error && <div className='error'><p className="error">{error.error}</p></div>}
          <p>Don't have an account?</p>
             <Link to="/signup">Sign up</Link>
        </section>
      </section>
    </>
  )
}

export default SignInPage
