import bookingSchema from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    const existingBooking = await bookingSchema.findOne({
      phone: bookingData.phone,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Booking already exists for this Phone Number",
      });
    }

    const booking = new bookingSchema(bookingData);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await bookingSchema.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingSchema.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error: ${error.message}`,
    });
  }
};
