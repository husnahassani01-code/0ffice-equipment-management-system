import React from 'react'
import logo from '../assets/logo.png'
import './login.css'

function Login({ onLogin }) {
   const handleSubmit = (event) => {
      event.preventDefault();
      onLogin?.();
   };

   return (
      <div className='loginContainer'>
         <div className='loginH'>
            <div></div>
            <h2>Equipment Track Management System</h2>
            <button>Get Started</button>
         </div>
         <div className='loginForm'>
            <div>
               <img src={logo} alt="" id='logoForm' />
            </div>
            <form className='inputs' onSubmit={handleSubmit}>
               <div className='inputAll'>
                  <label htmlFor="username">Username: </label>
                  <input id="username" type="text" placeholder='Enter username/Email.....' className='inputForm' />
               </div>
               <div className='inputAll'>
                  <label htmlFor="password">Password: </label>
                  <input id="password" type="password" placeholder='Enter Password.....' className='inputForm' />
               </div>
               <div className='formButton'>
                  <button id='btn1' type='submit'>Login</button>
                  <div className='formPb'>
                     <p>Do not have an account..?</p>
                     <button type='button'>Create account</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Login
