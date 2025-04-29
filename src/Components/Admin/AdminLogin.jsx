import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

export default function AdminLogin() {

  const navigate = useNavigate()

  const [admin, setAdmin] = useState({
    email : '',
    password : ''
  })


  const handleClick = (e) => {
    setAdmin((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const login = await axiosInstance.post('https://multi-tenant-backend-aypx.onrender.com/adminLogin', admin)
      if(login.data.message){

localStorage.setItem('token', login.data.token);
localStorage.setItem('isAdmin', true)

        navigate('/adminDashboard')
      }

    } catch (error) {
      console.log(error.response.data.error)
      alert(error.response.data.error)
    }

  }
  return (
    <div>
  <section className="vh-100" style={{ backgroundColor: "#eee" }}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: 25 }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Admin Login
                  </p>
                  <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                  
                     
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw" />
                      <div
                        data-mdb-input-init=""
                        className="form-outline flex-fill mb-0"
                      > <label className="form-label" htmlFor="form3Example4c">
                      Email
                    </label>
                        <input
                          type="email"
                          id="form3Example4c"
                          className="form-control"
                          name='email'
                          value={admin.email}
                          onChange={handleClick}
                        />
                       
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw" />
                      <div
                        data-mdb-input-init=""
                        className="form-outline flex-fill mb-0"
                      ><label className="form-label" htmlFor="form3Example4cd">
                      Password
                    </label>
                        <input
                          type="password"
                          id="form3Example4cd"
                          className="form-control"
                          name='password'
                          value={admin.password}
                          onChange={handleClick}
                        />
                        
                      </div>
                    </div>
                    <div className="d-flex justify-content-center my-3 mx-4 mb-3 mb-lg-4">
                      <button
                        type="submit"
                        data-mdb-button-init=""
                        data-mdb-ripple-init=""
                        className="btn btn-primary btn-lg"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  )
}
