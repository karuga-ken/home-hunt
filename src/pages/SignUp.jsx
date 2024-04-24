import React from 'react'
import { useState } from 'react'
import '../index.css'
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {db} from "../firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: "",
    password: '',
  });
  const {email, password, name} = formData;
  const navigate = useNavigate()

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e){
    e.preventDefault()

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formData.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Sign Up Successful")
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with your registration")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>

      <div className='flex justify-center items-center px-6 py-12 max-w-6xl mx-auto flex-wrap '>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.pexels.com/photos/8482895/pexels-photo-8482895.jpeg?auto=compress&cs=tinysrgb&w=300' alt="key"
          className='w-full rounded-2xl'/>
        </div>

        <div className='lg:ml-20 w-full md:w-[67%] lg:w-[40%]'>
          <form onSubmit={onSubmit}>
          <input className = 'w-full px-4 py-2 text-xl text-gray-700 mb-6 bg-white border-gray-300 rounded transition ease-in-out'
            type='text' id='name' 
            placeholder = 'Enter Full Name'
            value={name}
            onChange={onChange}/>  


            <input className = 'w-full px-4 py-2 text-xl text-gray-700 mb-6 bg-white border-gray-300 rounded transition ease-in-out'
            type='email' id='email' 
            placeholder = 'Email Address'
            value={email}
            onChange={onChange}/>  

            <div className='relative mb-6'>
              <input className = 'w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              type={showPassword ? "text" : "password"} id='password' 
              placeholder = 'Password'
              value={password}
              onChange={onChange}/> 
              {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' 
              onClick={()=>setShowPassword((prevState)=> !prevState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer'  onClick={()=>setShowPassword((prevState)=> !prevState)}/>)}
            </div>

            <div className='flex flex-wrap justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an Account?
                <Link to="/sign-in" className='text-red-700 hover:text-red-400 transition duration-200 ease-in-out'>Sign In</Link>
              </p>
              <p>
                <Link to="/forgot-password"  className='text-blue-700 hover:text-blue-400 transition duration-200 ease-in-out'>Forgot Password?</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3  text-sm font-medium uppercase rounded shadow-md active:bg-blue-800 hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg'>
            Sign Up
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
