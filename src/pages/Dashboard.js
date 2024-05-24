import React, { useEffect, useState } from 'react'
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const[blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=>{
        fetchBlogs();
    }, [])

    const fetchBlogs = async()=>{
        try {
            const resp = await api.get('/get_blogs');
            setBlogs(resp.data);
        } catch (error) {
            setError('error');
        }
    }

    const handleDelete = (async id=>{
        if(window.confirm('Are you sure you want to delete this blog?')){
            try {
                await api.delete(`/blog/${id}`);
                fetchBlogs();
            } catch (error) {
                setError('Error in deleting');
            }
        }
    })

  return (
    <div className='container-fluid'>
        <div className='mt-4'>
            <table>
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>CreatedAt</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
              </thead>        
              <tbody>
                {blogs.map(blog=>{
                    <tr key={blog._id}>
                      <td>{blog.title}</td>
                      <td>{blog.description}</td>
                      <td>{blog.category}</td>
                      <td>{blog.status}</td>
                      <td>{blog.createdAt}</td>
                      <td><Link to={`edit/${blog._id}`} class="btn btn-warning">Edit</Link></td>
                      <td><button type="button" class="btn btn-danger" onClick={()=> handleDelete(blog._id)}>Delete</button></td>
                  </tr>
                })}                  
              </tbody>        
            </table>
        </div>      
    </div>
  )
}

export default Dashboard
