/* eslint-disable react/no-unescaped-entities */


import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Context } from "../../Contexts/MainContext";
import { login } from "../../Reducers/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { openToast } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_BASE_URL}/login`, data);

      if (response.data.status === 1) {
        dispatch(
          login({
            data: response.data.user,
          })
        );
        openToast("User Login Successfully");

        // Redirect to the intended page or default to home
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-3 bg-gray-300">
      <div className="flex flex-col justify-center items-center">
        <div className="h-[200px] w-[200px] rounded-full border-4 border-white mx-auto">
          <img
            src="/Images/panch-2.jpg"
            className="h-[180px] w-[180px] mt-[6px] mx-auto rounded-[100%]"
            alt="Profile"
          />
        </div>
        <h1 className="mt-10 text-center font-semibold text-[24px] md:text-[30px]">
          WELCOME TO PANCHAYAT CAFE
        </h1>
        <button
          onClick={openPopup}
          className="bg-black text-[14px] font-bold text-white w-[250px] md:w-[270px] mt-8 h-[40px] rounded-[50px] transition-all transform hover:bg-gray-800 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
        >
          Login Or Sign Up
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl w-[90%] max-w-[600px] p-6 mx-auto" id="popup">
            <button
              className="absolute top-4 right-4 text-black font-bold"
              onClick={closePopup}
            >
              X
            </button>
            <form onSubmit={handleSubmit}>
              <h1 className="text-[22px] md:text-[25px] font-bold">Login</h1>
              <h3 className="uppercase mt-6 text-[14px] md:text-[15px]">Email</h3>
              <input
                type="text"
                placeholder="Enter Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-b-2 text-[13px] mt-2 w-full p-1"
                required
              />
              <h3 className="uppercase mt-6 text-[14px] md:text-[15px]">Password</h3>
              <input
                type="password"
                placeholder="Enter Email Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 text-[13px] mt-2 w-full p-1"
                required
              />
              <button className="font-[1px] text-sm mt-4">Forget Password</button>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="rounded-2xl h-[40px] w-full bg-black text-white mt-6 transition-all transform hover:bg-gray-800 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                Login
              </button>
            </form>
            <hr className="mt-6" />
            <span className="block text-center mt-4 text-sm">
              Don't have an account?
              <Link to={"/register"}>
                <button className="text-blue-500 ml-1">Sign Up</button>
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
