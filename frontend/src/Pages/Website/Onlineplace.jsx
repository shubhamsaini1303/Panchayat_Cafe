import { Link } from "react-router-dom";

const Onlineplace = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen relative"
      style={{
        backgroundImage: "url('/Images/thankyou.jpg')", // Update the path as necessary
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Ensures the background stays fixed
      }}
    >
      {/* Black overlay with 50% opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full z-10 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
        <h1 className="text-2xl font-bold text-gray-800 mb-4  sm:text-lg md:text-xl lg:text-2xl">
          Thank you.
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
          Your order has been confirmed
        </p>
        <Link to={"/"}>
          <button className="mt-6 px-6 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-900 focus:outline-none text-sm sm:text-base md:text-lg lg:text-xl">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Onlineplace;
