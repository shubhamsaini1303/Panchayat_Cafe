import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile, CgMenu, CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { lsToUser, logout } from "../../Reducers/UserSlice";
import { emptyCart } from "../../Reducers/CartSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((store) => store.cart.data || []); // Fallback to an empty array
  const user = useSelector((store) => store.user.data || null); // Fallback to null
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(lsToUser()); // Fetch user info from localStorage/session
  }, [dispatcher]);

  const handleLogout = () => {
    dispatcher(logout()); // Clear user state
    dispatcher(emptyCart()); // Clear cart state
    navigate("/login");
  };

  return (
    <div className="shadow-md">
      <div className="flex justify-between items-center h-[70px] p-4" style={{ background: "#231709" }}>
        {/* Logo */}
        <Link to="/">
          <img src="/Images/panch-2.jpg" className="h-[60px] rounded-full" alt="Logo" />
        </Link>

        {/* Large screen navigation */}
        <ul className="hidden md:flex gap-[80px] items-center text-gray-700 cursor-pointer">
          <Link to="/" className="text-white"><li>Home</li></Link>
          <Link to="/order" className="text-white"><li>Order</li></Link>
          <Link to="/cart" className="text-white relative">
            <li>Cart</li>
            <span className="absolute top-0 -right-6 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
              {cart.length}
            </span>
          </Link>
          <Link to="/about" className="text-white"><li>About</li></Link>

          {/* Profile/Logout based on login status */}
          {user ? (
            <>
              <Link to="/profile" className="text-gray-400 text-3xl">
                <CgProfile />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black text-white font-bold md:w-[130px] py-2 rounded-full transition hover:bg-gray-800 hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-400 text-3xl">
              <CgProfile />
            </Link>
          )}
        </ul>

        {/* Mobile menu toggle button */}
        <div className="md:hidden text-3xl text-white cursor-pointer" onClick={() => setMenuOpen(true)}>
          <CgMenu />
        </div>
      </div>

      {/* Mobile menu (sidebar) */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-[250px] h-full bg-white shadow-md z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src="/Images/panch-2.jpg" className="h-[40px] rounded-full" alt="Logo" />
            </Link>
            <div className="text-3xl cursor-pointer" onClick={() => setMenuOpen(false)}>
              <CgClose />
            </div>
          </div>
          <ul className="flex flex-col gap-10 text-gray-700 cursor-pointer">
            <Link to="/" onClick={() => setMenuOpen(false)}><li>Home</li></Link>
            <Link to="/order" onClick={() => setMenuOpen(false)}><li>Order</li></Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              <li>
                Cart
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                  {cart.length}
                </span>
              </li>
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}><li>About</li></Link>

            {/* Profile/Logout for mobile */}
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <li className="text-gray-400 text-3xl"><CgProfile /></li>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-black text-white font-bold md:w-[130px] py-2 rounded-full transition hover:bg-gray-800 hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <li className="text-gray-400 text-3xl"><CgProfile /></li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
