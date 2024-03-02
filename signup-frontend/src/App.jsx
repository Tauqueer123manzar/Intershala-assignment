
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App= () => {
  const [loginData, setLoginData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [registerData, setRegisterData] = useState({
    userName: "",
    registerEmail: "",
    registerPassword: "",
    registerPhone: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user-Login", {
        email: loginData.loginEmail,
        password: loginData.loginPassword,
      });
      if (response.status === 200) {
        const token = response.data.data.token;
        Cookies.set("token", token, { expires: 1 });
        console.log("Login Successful and the user:", response.data);
        toast.success("login successfully!!!");
        setLoginData({
          loginEmail: "",
          loginPassword: "",
        });
      } else {
        console.error("Login Failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/user-Register", {
        username: registerData.userName,
        email: registerData.registerEmail,
        password: registerData.registerPassword,
        phone: registerData.registerPhone,
      });

      if (response.status === 201) {
        console.log("Registraion successfull:", response.data);
        toast.success("Register Successfully");
        setRegisterData({
          userName: "",
          registerEmail: "",
          registerPassword: "",
          registerPhone: "",
        });
      } else {
        console.error("Registration failed");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("registration failed");
    }
  };
  const handleLoginInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleRegisterInputChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex h-screen bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg"> 
        <div className="w-1/2 md:w-1/2 p-7 shadow-lg rounded-lg">
          <form
            action="/user-Login"
            method="post"
            className="login-form"
            onSubmit={handleLogin}
          >
            <h3 className="mb-3 ml-5 p-6 text-center text-lg font-bold text-white">Login</h3>
            <div className="mb-3 w-1/2">
              <label htmlFor="loginEmail" className="form-label text-white">
                Email address
              </label>
              <input
                type="email"
                className="form-control bg-gray-200 w-full px-2 py-2 mt-2 rounded-md "
                id="loginEmail"
                name="loginEmail"
                value={loginData.loginEmail}
                onChange={handleLoginInputChange}
                aria-describedby="loginEmailHelp"
              />
              <div id="loginEmailHelp" className="form-text text-gray-200 mt-4">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3 w-1/2">
              <label htmlFor="loginPassword" className="form-label text-white">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-gray-200 w-full px-3 py-2 mt-2 rounded-md"
                id="loginPassword"
                name="loginPassword"
                value={loginData.loginPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="mb-3 flex items-center text-white">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <div className="flex">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded-md ">
                Log in
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 md:w-1/2 p-3 bg-red-500 shadow-md rounded-md">
          <form
            action="/user-Register"
            method="post"
            className="login-form"
            onSubmit={handleRegister}
          >
            <h3 className="mb-3 text-white flex justify-center font-bold ">Signup</h3>
            <div className="mb-3 w-1/2">
              <label htmlFor="userName" className="form-label text-white font-semibold ml-5">
                User Name
              </label>
              <input
                type="text"
                className="form-control bg-gray-200 w-full mt-2 px-3 py-2 rounded-md ml-5"
                id="userName"
                name="userName"
                value={registerData.userName}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            <div className="mb-3 w-1/2">
              <label htmlFor="registerPhone" className="form-label text-white font-semibold ml-5">
                Phone
              </label>
              <input
                type="text"
                className="form-control bg-gray-200 w-full mt-2 px-3 py-2 ml-5 rounded-md"
                id="registerPhone"
                name="registerPhone"
                value={registerData.registerPhone}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            <div className="mb-3 w-1/2">
              <label htmlFor="registerEmail" className="form-label text-white font-semibold ml-5">
                Email address
              </label>
              <input
                type="email"
                className="form-control bg-gray-200 w-full mt-2 px-3 py-2 ml-5 rounded-md"
                id="registerEmail"
                name="registerEmail"
                value={registerData.registerEmail}
                onChange={handleRegisterInputChange}
                aria-describedby="registerEmailHelp"
                required
              />
              <div id="registerEmailHelp" className="form-text mt-2 text-white py-2 ml-5">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3 w-1/2">
              <label htmlFor="registerPassword" className="form-label text-white font-semibold ml-5">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-gray-200 w-full mt-2 px-3 py-2 ml-5 rounded-md "
                id="registerPassword"
                name="registerPassword"
                value={registerData.registerPassword}
                onChange={handleRegisterInputChange}
                required
              />
            </div>
            <div className="mb-3 flex items-center text-white ml-5">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <div className="mb-3">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 mt-4 font-semibold rounded-md ml-5">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;