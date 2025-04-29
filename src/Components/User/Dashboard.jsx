import React, { useEffect, useState } from 'react'
import img from '../../assets/background.jpg'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'


export default function UserDashboard() {


  const [home, setHome] = useState(false)
  const [tasks, setTasks] = useState(false)
  const [userTask, setUserTask] = useState([])
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [username, setUsername] = useState('')

  const navigate = useNavigate()




  useEffect(() => {
    setHome(true)
    // fetchUser()
  
  }, [])


  // async function fetchUser(){

  //   try {

  //     const token = localStorage.getItem('token'); 
  //     if (token) {
  //       const decoded = jwt_decode(token);
  //       console.log(decoded); 
        
  //     }
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleHome = () => {
    setHome(true)
    setTasks(false)
    
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isUser')
    navigate('/')
    
  }


  async function fetchTasks(){

    try {
      const data = await axiosInstance.get('/userTask')
      console.log(data.data)
      setUserTask(data.data.tasks)
    } catch (error) {
      console.log(error)
    }
      
  }




  const handleTasks = () => {
    setHome(false)
    setTasks(true)
    fetchTasks()
  }

  
    const handleCommentSubmit = async () => {
      try {
  
        await axiosInstance.post('/comment', { content: commentText })
        alert('Comment submitted successfully!')
        setShowCommentModal(false)
        setCommentText("")
      } catch (error) {
        console.error(error)
        alert('Error submitting comment')
      }
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
            <span className="fs-4">User</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <button className={home ? 'nav-link active' : 'nav-link text-white'} aria-current="page" onClick={handleHome}>
    
                Home
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

{ tasks && (
  <div className="container w-75 my-4">
    <div className="table-responsive">
      <table className="table table-hover table-striped align-middle shadow-sm border">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
      <th>File</th>
          </tr>
        </thead>
        <tbody>
          {userTask.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.due_date.slice(0,10)}</td>
              <td>
                {task.fileUrl ? (
                  <a 
                    href={task.fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View PDF
                  </a>
                ) : (
                  <span className="text-muted">No File</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

     
          <button className='btn btn-primary' onClick={() => setShowCommentModal(true)}>
            Comment
          </button>
     
  </div>
)}

{showCommentModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Comment</h5>
                <button type="button" className="btn-close" onClick={() => setShowCommentModal(false)}></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="3"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  placeholder="Enter your comment here"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCommentModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCommentSubmit}>
                  Submit Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

  
    </div>
  )
}