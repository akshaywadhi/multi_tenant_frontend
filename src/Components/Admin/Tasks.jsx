
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const res = await axiosInstance.get('/fetchTasks');
      setTasks(res.data.tasks);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/deleteTask/${id}`);
    fetchTask();
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axiosInstance.put(`/updateTask/${selectedTask.id}`, {
      title: selectedTask.title,
      description: selectedTask.description,
      due_date: selectedTask.due_date,
    });
    setShowModal(false);
    fetchTask();
  };

  return (
    <div className="container w-75 my-4">
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle shadow-sm border">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Assigned Task</th>
              <th>Update Or Delete</th>
            </tr>
          </thead>
          <tbody>
  {tasks?.map((task, index) => {
    if (!task.assignee?.email) return null;

    return (
      <tr key={task.id}>
        <td>{index + 1}</td>
        <td>{task.assignee.email}</td>
        <td>{task.organization?.name}</td>
        <td>{task.title}</td>
        <td>
          <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdate(task)}>Update</button>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id)}>Delete</button>
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

      {showModal && selectedTask && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={selectedTask.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" value={selectedTask.description || ''} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" name="due_date" value={selectedTask.due_date?.substring(0, 10)} onChange={handleChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-success" onClick={handleSave}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
