import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [orgs, setOrgs] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    async function data() {
      try {
        let data = await axios.get("https://multi-tenant-backend-aypx.onrender.com/orgs");

        console.log(data.data.findorg);
        setOrgs(data.data.findorg);
      } catch (error) {
        alert(error.response.data.error)
        console.log(error.response.data)
      }
    }
    data();
  }, []);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    org_name : ""
  });

  const handleClick = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOrgChange = (e) => {
    setUser((prev) => ({
      ...prev,
      org_name: e.target.value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {

      if (user.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      
      const signup = await axios.post('https://multi-tenant-backend-aypx.onrender.com/signup', user)

      console.log(signup.data)
      alert(signup.data.message)
      navigate('/login')
    } catch (error) {
      console.log(error)
      alert(`${error.response.data.error}`)
    }
  };
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
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            {" "}
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="first_name"
                              value={user.first_name}
                              onChange={handleClick}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            {" "}
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control"
                              name="last_name"
                              value={user.last_name}
                              onChange={handleClick}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            {" "}
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="form3Example4c"
                              className="form-control"
                              name="email"
                              value={user.email}
                              onChange={handleClick}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="password"
                              value={user.password}
                              onChange={handleClick}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center my-3 mx-4 mb-3 mb-lg-4">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={user.org_name}
                            onChange={handleOrgChange} 
                          >
                                     <option defaultValue=''>Select Organization</option>
                            {orgs.map((org) => {
                              return (
                                <>
                       
                                <option key={org.id} value={org.name}>
                                  {org.name}
                                </option>
                                </>
                              );
                            })}
                          </select>
                        </div>

                        <div className="d-flex justify-content-center my-3 mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-primary btn-lg"
                          >
                            Register
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
  );
}
