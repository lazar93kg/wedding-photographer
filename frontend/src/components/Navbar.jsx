import React, { useState } from 'react'
import './Navbar.css'
import { Link, Navigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const [click, setClick] = useState(false)
  const { logout } = useLogout()
  const user = JSON.parse(localStorage.getItem('user'))

  // Logout user
  const handleClick = () => {
    logout()
      return <Navigate replace to="/" />

  }
  if (!user) {
    return
  }


  return (
    <section className='navbar'>
      <section>
        <button onClick={handleClick}>Logout</button>
      </section>
      <section>
        {user && !click ? <Link onClick={() => setClick((prev) => !prev)} to='/gallery'><img src="/img/grid.png" alt="grid image" width={'30px'} />
        </Link> : <Link onClick={() => setClick((prev) => !prev)} to='/capture'><img src="/img/lens.png" alt="lens image" width={'30px'} /></Link>
        }
      </section>
    </section>
  )
}
