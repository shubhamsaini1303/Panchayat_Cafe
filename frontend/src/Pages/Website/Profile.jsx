

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderListing from "./OrderListing";
import { emptyCart } from "../../Reducers/CartSlice";
import { logout } from "../../Reducers/UserSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("My Profile");
  
  const user = useSelector((state) => state.user.data);
  const userName = user?.name || "User";
  const userEmail = user?.email || "example@example.com";

  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    navigate("/login");
  };

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "My Profile":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            <p>
              <span className="font-semibold">Name:</span> {userName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userEmail}
            </p>
          </div>
        );
      case "Orders":
        return (
          <div>
            <OrderListing />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">

      {/* Profile Section */}
      <div className="w-full max-w-6xl mx-auto mt-6 flex flex-col lg:flex-row gap-4">
        {/* Sidebar */}
        <div className="lg:w-1/4 bg-white p-4 rounded-md shadow-md">
          <div className="flex flex-col items-center mb-6">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-300" >
              <img
                src="/Images/panch-2.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{userName}</h2>
            <p className="text-gray-500">{userEmail}</p>
          </div>
          <ul className="space-y-4">
            {["My Profile", "Orders"].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left py-2 px-4 rounded-md ${
                    activeTab === tab
                      ? "bg-black text-white font-bold"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
              >
                Logout
              </button>
                         <button
                
                className="w-full py-2 px-4 rounded-md bg-black text-white hover:bg-gray-200"
              >
                                     <Link to="/admin/login"><li>Admin Only</li></Link>
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4 bg-white p-6 rounded-md shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
