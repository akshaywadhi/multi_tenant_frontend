import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

export default function Comment() {


  const [comments, setComments] = useState([])

  useEffect(() => {

    fetchComment()

  }, [])


  async function fetchComment(){
      try {

        const data = await axiosInstance.get('/fetchComment')
        console.log(data.data.comments)
        setComments(data.data.comments)
        
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className="container w-75 my-4">
    <div className="table-responsive">
      <table className="table table-hover table-striped align-middle shadow-sm border">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Organization</th>
            
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
  {comments?.map((com, index) => {
    if (!com.user?.first_name) return null; 

    return (
      <tr key={com.id}>
        <td>{index + 1}</td>
        <td>{com.user.first_name}</td>
        <td>{com.user?.organization?.name}</td>
        <td>{com.content}</td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
</div>

  )
}
