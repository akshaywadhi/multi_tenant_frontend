import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';


export default function UsersWithTask() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assigned_to: '',
    due_date: '',
    org_id: ''
  });
 
const [emailInfo, setEmailInfo] = useState({ to: '', subject: '', message: '' });


  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await axiosInstance.get('/fetchUsers');
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleDeleteClick = async (userId) => {
    try {
      await axiosInstance.delete(`/deleteUser/${userId}`);
      fetchUsers();
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };


  const handleAssignClick = (user) => {
    setSelectedUser(user);
    setShowModal(true); 
    setNewTask({
      ...newTask,
      assigned_to: user.id,
      org_id: user.org_id,
    });
  };

 
  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async () => {
    try {
      await axiosInstance.post('/tasks', newTask);
      setNewTask({
        title: '',
        description: '',
        assigned_to: selectedUser ? selectedUser.id : '',
        due_date: '',
      });
      alert('Task assigned successfully!');
      setShowModal(false); 
    } catch (error) {
      console.log(error);
      alert('Failed to assign task');
      
    }
  };



  

  return (
    <div className="container w-75 my-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle shadow-sm border">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Assign/Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.organization.name}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => handleAssignClick(user)}>
                    Assign Task
                  </button>
               
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} aria-hidden="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Assign Task to {selectedUser?.email}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Assigned to (Email)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedUser?.email || ''}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Organization</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedUser?.organization.name || ''}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="due_date"
                      value={newTask.due_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    Assign Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
