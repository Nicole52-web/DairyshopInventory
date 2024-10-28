import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar';
import Form from '../images/on.png'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const SignUp = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {reset } = useForm();
  const navigate = useNavigate();

  const handleSubmit= async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://dairyshop-inventory-api.vercel.app/api/user/signup', {
        name,
        email,
        password
      })

      if (response.status === 201){
        console.log("User created successfully")

        Swal.fire({
          icon: "success",
          title: "Hurray...",
          text: response?.data?.message,
      });
      reset();
      navigate('/login')
      }else{
        throw new Error(' Unexpected Error ')
      }
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred during signup.');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data,
    });
    }
  }

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 1000)
}, []);






    return (
      <div>
        <Navbar/>
        {loading ? (
          <Loading/>
        ) : (
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-14 w-auto" src={Form} alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="/" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder='FirstName LastName'
                    required
                    value={name}
                  onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder='johndoe@gmail.com'
                    required
                    value={email}
                  onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                  onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Have an account? 
              <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                 Log In
              </a>
            </p>
          </div>
        </div>
        )}
        <Footer/>
      </div>
    );
  };

export default SignUp
