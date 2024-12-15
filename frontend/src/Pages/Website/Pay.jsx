import { useState } from 'react';

const Pay = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handlePaymentOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePayClick = () => {
    if (!selectedOption) {
      alert('Please select a payment method.');
    } else {
      alert(`You selected ${selectedOption}. Proceeding with payment...`);
      // Add payment processing logic here
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Choose Payment Method</h2>
        
        <div className="space-y-4">
          <label className="block">
            <input
              type="radio"
              name="payment"
              value="UPI Payment"
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            UPI Payment
          </label>

          <label className="block">
            <input
              type="radio"
              name="payment"
              value="Card Payment"
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            Card Payment
          </label>

          <label className="block">
            <input
              type="radio"
              name="payment"
              value="Online Payment"
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            Online Payment
          </label>

          <label className="block">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={handlePaymentOptionChange}
              className="mr-2"
            />
            Cash on Delivery
          </label>
        </div>

        <button
          onClick={handlePayClick}

         className="w-full md:w-[380px] h-[40px] border border-blue-600  mt-4 mx-auto rounded-2xl bg-black text-white transition-all transform hover:bg-gray-800 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">Pay</button>
      </div>
    </div>
  );
};

export default Pay;
