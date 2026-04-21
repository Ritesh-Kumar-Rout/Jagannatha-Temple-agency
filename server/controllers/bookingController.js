const bookingService = require('../services/bookingService');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await bookingService.addBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
