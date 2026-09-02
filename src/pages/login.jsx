import React from 'react'
import logo from '../assets/logo.png'

const login = ({onLogin}) => {
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
            <div className='inputs'>
               <div className='inputAll'>
                  <label for="Username..">Username: </label>
                  <input value="username" type="text" placeholder='Enter username/Email.....' className='inputForm' />
               </div>
               <div className='inputAll'>
                  <label for="">Password: </label>
                  <input value="password" type="password" placeholder='Enter Password.....' className='inputForm' />
               </div> 
            </div>
            <div className='formButton'>
               <button id='btn1' type='submit' onClick={onLogin}>Login</button>
               <div className='formPb'>
                  <p>Do not have an account..?</p>
                  <button>Create account</button>
               </div>
            </div>
        </div>


      
    </div>
  )
}

export default login
