
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logout } from "../../Reducers/AdminSlice"; // Adjust the path as per your file structure

const Slider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    localStorage.removeItem("admin-token"); // Clear token from localStorage
    navigate("/admin/login"); // Navigate to login page
  };

  return (
    <div className="h-full">
      <div className="border border-black bg-gray-600 min-h-screen h-full">
        <h2 className="text-white text-3xl text-center my-4">BVM Admin</h2>
        <hr />
        <ul className="text-white">
          <Link to={"/admin/dashboard"}>
            <li className="flex items-center gap-3 ml-[20px] mt-3 text-[20px]">
              <MdDashboard /> Dashboard
            </li>
          </Link>
          <Link to="/admin/category">
            <li className="flex items-center gap-3 ml-[20px] mt-4 text-[20px]">
              <TbCategoryFilled /> Category
            </li>
          </Link>
          <Link to="/admin/product">
            <li className="flex items-center gap-3 ml-[20px] mt-4 text-[20px]">
              <TbCategoryFilled /> Product
            </li>
          </Link>
          <Link to="/admin/orderlisting">
            <li className="flex items-center gap-3 ml-[20px] mt-4 text-[20px]">
              <TbCategoryFilled /> Orders
            </li>
          </Link>
          <Link to="/admin/transation">
            <li className="flex items-center gap-3 ml-[20px] mt-4 text-[20px]">
              <TbCategoryFilled /> Transaction
            </li>
          </Link>
          <li
            className="flex items-center gap-3 ml-[20px] mt-4 text-[20px] cursor-pointer"
            onClick={handleLogout} // Attach the logout handler
          >
            <TbCategoryFilled /> Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slider;
