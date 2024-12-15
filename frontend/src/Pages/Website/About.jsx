import { BsInstagram, BsTelegram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const About = () => {
  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-7 h-auto bg-gray-300 lg:h-auto mt-[2px] py-6 lg:py-12"
 
      >
        {/* First Section: Heading */}
        <div className="col-span-7 text-center mb-6 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold uppercase text-black">
            Panchayat Cafe
          </h1>
        </div>

        {/* Second Section: Shop Details */}
        <div className="col-span-7 lg:col-span-4 px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl text-center lg:text-left font-semibold">
            About Us
          </h2>
          <hr className="w-full lg:w-[300px]  mx-auto lg:ml-0 mt-2 mb-4" />
          <p className="text-lg  font-medium mt-2">
            Owner: <span className="font-semibold">Mr. Siddharth </span>
          </p>
          <p className="text-lg mt-4">
            Welcome to Panchayat Cafe, your go-to destination for delicious and
            authentic food. We take pride in serving fresh, homemade-style
            dishes with love and care. Our goal is to create a space where
            everyone can enjoy great food and amazing hospitality.
          </p>
          <p className="text-lg mt-4 font-medium">Contact: 9876******</p>
          <p className="text-lg font-medium">Email: panchayatcafe@gmail.com</p>
        </div>

        {/* Third Section: Image */}
        <div className="col-span-7 lg:col-span-3 flex justify-center mt-8 lg:mt-0">
          <img
            // src="/public/Images/panch-2-removebg-preview.png"
            src="/Images/image.png"
            alt="Panchayat Cafe"
            className="h-[300px] w-[250px] lg:h-[300px] lg:w-[250px]"
          />
        </div>

        {/* Fourth Section: Social Media Links */}
        <div className="col-span-7 mt-8 lg:mt-12 flex flex-col items-center">
          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Connect With Us</h2>
          <div className="flex gap-6 text-2xl">
            <BsInstagram className="cursor-pointer hover:text-[#E1306C]" />
            <FaFacebook className="cursor-pointer hover:text-[#1877F2]" />
            <BsTwitter className="cursor-pointer hover:text-[#1DA1F2]" />
            <BsTelegram className="cursor-pointer hover:text-[#0088CC]" />
            <BsWhatsapp className="cursor-pointer hover:text-[#25D366]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
