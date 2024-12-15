/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import axios from "axios";
import { Context } from "../../Contexts/MainContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Reducers/AdminSlice";

export default function Adminlogin() {
    const { openToast } = useContext(Context);
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        // Input validation
        if (!email || !password) {
            openToast("Email and password are required", 0);
            return;
        }

        const data = { email, password };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
                data
            );

            openToast(response.data.msg, response.data.status);

            if (response.data.status === 1) {
                console.log(response.data);
                e.target.reset();
                dispatcher(
                    login({
                        data: response.data.admin,
                        token: response.data.token,
                    })
                );
                navigator(`/admin`);
            }
        } catch (error) {
            console.error("Login error:", error); // Log detailed error for debugging
            if (error.response) {
                // Server responded with a status other than 2xx
                openToast(error.response.data?.msg || "Server-side error", 0);
            } else if (error.request) {
                // No response received from server
                openToast("No response from server. Please try again.", 0);
            } else {
                // Other errors
                openToast("An unexpected error occurred. Please try again.", 0);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to your account</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
