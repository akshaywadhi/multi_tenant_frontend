import React, { useEffect, useState } from 'react'
import img from '../../assets/background.jpg'
import CreateOrg from './CreateOrg'
import Users from './Users'
import Tasks from './Tasks'
import { useNavigate } from 'react-router-dom'



export default function AdminDashboard() {


  const [home, setHome] = useState(false)
  const [org, setOrg] = useState(false)
  const [users, setUsers] = useState(false)
  const [tasks, setTasks] = useState(false)
  const navigate = useNavigate()



  useEffect(() => {
    setHome(true)
  }, [])

  const handleHome = () => {
    setHome(true)
    setOrg(false)
    setUsers(false)
    setTasks(false)
    
  }



  const handleOrg = () => {
    setOrg(true)
    setHome(false)
    setUsers(false)
    setTasks(false)
    
  }

  
  const handleUsers = () => {
    setHome(false)
    setOrg(false)
    setUsers(true)
    setTasks(false)
    
  }

  const handleTasks = () => {
    setHome(false)
    setOrg(false)
    setUsers(false)
    setTasks(true)
    
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <main>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: 200, minHeight: '100vh' }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <svg className="bi me-2" width={40} height={32}>
              <use xlinkHref="#bootstrap" />
            </svg>
            <span className="fs-4">Admin</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <button className={home ? 'nav-link active' : 'nav-link text-white'} aria-current="page" onClick={handleHome}>
    
                Home
              </button>
            </li>
            <li>
              <button className={org ? 'nav-link active' : 'nav-link text-white'}  onClick={handleOrg}>
                Organizations
              </button>
            </li>
            <li>
              <button className={users ? 'nav-link active' : 'nav-link text-white'} onClick={handleUsers}>
                Users
              </button>
            </li>
            <li>
              <button className={tasks ? 'nav-link active' : 'nav-link text-white'} onClick={handleTasks}>
            
              Tasks
              </button>
            </li>
           
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
                    <i class="bi bi-box-arrow-right"></i>
           
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
      
          
              <li>
                <button className="dropdown-item" onClick={logout}>
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </main>
   {
    home && <div>
      <img src={img} className='bg mx-auto'/>
    </div>
   }

   {
    org && (
      <CreateOrg/>
    )
   }

   {
    users && (
      <Users/>
    )
   }

   {
    tasks && (
      <Tasks/>
    )
   }


  
    </div>
  )
}