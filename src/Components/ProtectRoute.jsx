import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({children}) {

  const isLogged = localStorage.getItem('isAdmin') === 'true'

  return isLogged ? children : <Navigate to='/'/>
}
