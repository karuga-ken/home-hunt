import React from 'react'
import { useState } from 'react'
import '../index.css'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onChange(e){
    setEmail( e.target.value);
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>

      <div className='flex justify-center items-center px-6 py-12 max-w-6xl mx-auto flex-wrap '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.pexels.com/photos/8482895/pexels-photo-8482895.jpeg?auto=compress&cs=tinysrgb&w=300' alt="key"
          className='w-full rounded-2xl'/>
        </div>

        <div className='lg:ml-20 w-full md:w-[67%] lg:w-[40%]'>
          <form>
            <input className = 'w-full px-4 py-2 text-xl text-gray-700 mb-6 bg-white border-gray-300 rounded transition ease-in-out'
            type='email' id='email' 
            placeholder = 'Email Address'
            value={email}
            onChange={onChange}/>  

            <div className='flex flex-wrap justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't Have an Account?
                <Link to="/sign-up" className='text-red-700 hover:text-red-400 transition duration-200 ease-in-out'>Register</Link>
              </p>
              <p>
                <Link to="/sign-in"  className='text-blue-700 hover:text-blue-400 transition duration-200 ease-in-out'>Sign In Instead</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3  text-sm font-medium uppercase rounded shadow-md active:bg-blue-800 hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg'>
            Send Reset Password
          </button>

          <div className='my-4 flex items-center before:border-t  before:flex-1  before:border-gray-300
          after:border-t  after:flex-1  after:border-gray-300
          '>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth/>
          </form>

          

          
        </div>
      </div>
    </section>
  )
}
