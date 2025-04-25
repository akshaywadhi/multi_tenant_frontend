import React from 'react'
import logo from '../assets/tool.png'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {

  const navigate = useNavigate()
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
      <img src={logo} />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-2">
   
                  <li className="nav-item">
                    <button onClick={() => navigate('/admin')} className="btn btn-secondary" >
                      Admin
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                      Signup
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-primary"  onClick={() => navigate('/login')}>
                      Login
                    </button>
                  </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
