import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectUser({children}) {
  const isLogged = localStorage.getItem('isUser') === 'true'

  return isLogged ? children : <Navigate to='/'/>
}
