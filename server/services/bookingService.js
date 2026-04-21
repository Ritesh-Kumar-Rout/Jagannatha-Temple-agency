let mockBookings = [
  { id: 1, name: 'John Doe', date: '2026-07-14', type: 'Darshan' },
  { id: 2, name: 'Jane Smith', date: '2026-07-15', type: 'Prasad' }
];

exports.getBookings = async () => {
  // In a Spring Boot architecture, this would call a Repository
  return mockBookings;
};

exports.addBooking = async (bookingData) => {
  const newBooking = {
    id: mockBookings.length + 1,
    ...bookingData,
  };
  mockBookings.push(newBooking);
  return newBooking;
};
