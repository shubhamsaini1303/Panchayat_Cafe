const Shop = require('../model/shopmodel');

// Add a new shop
exports.addShop = async (req, res) => {
  const { name, latitude, longitude, address } = req.body;

  try {
    // Validate required fields
    if (!name || !latitude || !longitude || !address) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new shop instance
    const shop = new Shop({
      name,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      },
      address
    });

    // Save shop to the database
    const savedShop = await shop.save();

    // Send the saved shop as a response
    res.status(201).json(savedShop);
  } catch (error) {
    console.error('Error adding shop:', error.message);
    res.status(500).json({ error: 'Internal Server Error. Failed to add shop.' });
  }
};

// Get all shops
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Error fetching shops' });
  }
};

// Get a single shop by ID
exports.getShopById = async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await Shop.findById(id);
    
    if (!shop) return res.status(404).json({ error: 'Shop not found' });
    
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    res.status(500).json({ error: 'Error fetching shop' });
  }
};



// Update a shop by ID
exports.updateShop = async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, address } = req.body;

  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      id,
      {
        name,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        address
      },
      { new: true }
    );

    if (!updatedShop) return res.status(404).json({ error: 'Shop not found' });
    
    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Error updating shop' });
  }
};

// Delete a shop by ID
exports.deleteShop = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShop = await Shop.findByIdAndDelete(id);

    if (!deletedShop) return res.status(404).json({ error: 'Shop not found' });
    
    res.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ error: 'Error deleting shop' });
  }
};

// Find nearest shops
exports.findNearestShops = async (req, res) => {
  const { latitude, longitude, maxDistance = 5000 } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const shops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.json(shops);
  } catch (error) {
    console.error('Error finding nearest shops:', error);
    res.status(500).json({ error: 'Error finding nearest shops' });
  }
};
