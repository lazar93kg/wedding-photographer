import './Sign.css'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom'


function SignUpPage() {
    // Get values from inputs
  const [error, setError] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = async (e) => {
    const userData = {
      email: email,
      password: password,
      role: role,
    }
    e.preventDefault()
    console.log(userData)
    const URL = 'http://localhost:5000/user/signup'
    const res = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
      // Create user in local storage
    const JsonData = await res.json();
    if (JsonData.error) {
      setError(JsonData.error)
    } else {
      localStorage.setItem('user', JSON.stringify(JsonData))
      window.location.reload(false);
    }
  }
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    return <Navigate replace to="/" />
  }
  return (
    <>
      <section className="form-flex">
        <section className="form-wrapper">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='password'
              required />
            <div className='input-radio'>
              <label htmlFor="user">User</label>
              <input type="radio"
                name='role'
                value="user"
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <label htmlFor="admin">Admin</label>
              <input type="radio"
                name='role'
                value="admin"
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
            <button className='button-sign'>Sign up</button>
          </form>
          {error && <div className='error'><p className="error">{error}</p></div>}
          <p>Already have an account?</p>
          <Link to="/signin">Sign in</Link>
        </section>
      </section>
    </>
  )
}

export default SignUpPage
