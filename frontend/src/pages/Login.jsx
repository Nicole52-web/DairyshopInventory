import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Form from '../images/on.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useUserContext } from '../context/UserContext';
import Loading from '../components/Loading';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleFetchMe, user }= useUserContext();
  const { reset } = useForm();
  const navigate = useNavigate();
  





  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/api/user/signin', {
            email,
            password
        });


        const token = response.data.token;
    localStorage.setItem('token', token);  // Store the token in localStorage

    // Call handleFetchMe to update the user state after login
    handleFetchMe();

        if (response.status === 200) {
            console.log("Login Successful");

            Swal.fire({
                icon: "success",
                title: "Hurray...",
                text: "Login successful!",
            });

            // Delay the navigation to ensure any other state updates are completed
            setTimeout(() => {
                navigate('/');  // Redirect to home or dashboard
            }, 1000);
            
        } else {
            throw new Error('Unexpected response status');
        }

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.response?.data?.message || "Login failed.",
        });
    }
};

useEffect(() => {
  setTimeout(() =>{
    setLoading(false);
  },1000)
}, []);
  
  
  
  

  return (
    <div>
      <Navbar />
      {loading ?  (
        <Loading/>
      ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-14 w-auto" src={Form} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            Don't have an account?
            <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      )}
      <Footer />
    </div>
  );
}

export default Login;
