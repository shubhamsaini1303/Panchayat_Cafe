const Footer = () => {
  return (
    <div
      className="bg-[#0A0A0A] py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 h-auto sm:h-[330px]">
        {/* Logo Section */}
        <div className="flex justify-center sm:block">
          <img
            src="/Images/panch-2.jpg"
            // /Images/panch-2.jpg"
            className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] mx-auto sm:mx-0 mt-4 rounded-full"
            alt="logo"
          />
        </div>

        {/* About Us */}
        <div className="text-center sm:text-left">
          <h1 className="font-semibold text-white text-lg sm:text-xl mt-4">
            About Us
          </h1>
          <p className="text-white text-sm sm:text-[13px] mt-2">Our Heritage</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Coffee House</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Our Company</p>
        </div>

        {/* Services */}
        <div className="text-center sm:text-left">
          <h1 className="font-semibold text-white text-lg sm:text-xl mt-4">
            Services
          </h1>
          <p className="text-white text-sm sm:text-[13px] mt-2">Beverages</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Food Items</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Online Orders</p>
        </div>

        {/* Support */}
        <div className="text-center sm:text-left">
          <h1 className="font-semibold text-white text-lg sm:text-xl mt-4">
            Support
          </h1>
          <p className="text-white text-sm sm:text-[13px] mt-2">
            Customer Service
          </p>
          <p className="text-white text-sm sm:text-[13px] mt-2">FAQs</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Contact Us</p>
        </div>

        {/* Connect */}
        <div className="text-center sm:text-left">
          <h1 className="font-semibold text-white text-lg sm:text-xl mt-4">
            Connect
          </h1>
          <p className="text-white text-sm sm:text-[13px] mt-2">Facebook</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Instagram</p>
          <p className="text-white text-sm sm:text-[13px] mt-2">Twitter</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
