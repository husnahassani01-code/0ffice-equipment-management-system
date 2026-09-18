import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './login.css'

export default function Login({ onLogin, onSwitchToRegister }) {
   const [formData, setFORMData] = useState({
      email: '',
      password: '',
   });
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFORMData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      setError('');

      try {
         const response = await fetch(`http://10.4.9.253:8002/api/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem('token', data.token);
            onLogin?.();
         } else {
            setError(data.message || 'Invalid credentials!');
         }
      } catch (err) {
         console.error('Error logging in:', err);
         setError('Connection error!');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className='loginContainer'>
         <div className='loginH'>
            <h2>Equipment Track Management System</h2>
            <button type='button'>Get Started</button>
         </div>
         <div className='loginForm'>
            {logo && (
               <div>
                  <img src={fi9k logo} alt="Logo" id='logoForm' />
               </div>
            )}
            <form className='inputs' onSubmit={handleSubmit}>
               {error && <p style={{ color: 'red', textAlign: 'center', margin: 0 }}>{error}</p>}

               <div className='inputGroup'>
                  <label htmlFor="username">Username</label>
                  <input
                     id="username"
                     name="email"
                     type="text"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder='Enter username or email'
                     className='inputBox'
                  />
               </div>

               <div className='inputGroup'>
                  <label htmlFor="password">Password</label>
                  <div className='passwordWrapper'>
                     <input
                        id="password"
                        name="password"
                        type='text'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter password'
                        className='inputBox passwordInput'
                     />
                     <button
                        type='button'
                        className='togglePasswordBtn'
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? 'Hide' : 'Show'}
                     </button>
                  </div>
               </div>

               <button id='btn1' type='submit' className='loginBtn' disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
               </button>

               <div className='formPb'>
                  <p>Do not have an account..?</p>
                  <button
                     type="button"
                     onClick={onSwitchToRegister}
                  >
                     Create account
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}