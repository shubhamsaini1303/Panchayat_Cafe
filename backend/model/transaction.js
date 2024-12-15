const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  order_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: Number, 
    enum: [1, 2], // Enum for types; add more values if needed
    required: true 
  },
  payment_status: { 
    type: Boolean, 
    required: true 
  },
  razorpay_response: { 
    type: Object, 
    default: null 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});


const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction;

// module.exports = mongoose.model('Transaction', transactionSchema);
