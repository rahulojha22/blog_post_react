import React, { useState } from 'react'
import { api } from '../services/api';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        try {
            const res = await api.post('auth/login', {email, password});
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            setError('Error');
        }
    }

  return (
    <div className='container-fluid mt-4'>        
        <div className='row justify-content-center mt-4'>
            <div className='col-6'>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="emailInput" placeholder="name@example.com" 
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Password</label>
                  <input type="text" className="form-control" id="passwordInput"
                  onChange={(e)=> setPassword(e.target.value)}
                   />
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-success" onClick={handleSubmit}>Login</button>
                    <button type="button" className="btn btn-primary mx-2" onClick={()=> window.location.href = '/register'}>Register</button>
                </div>                
            </div>            
        </div>      
    </div>
  )
}

export default Login
