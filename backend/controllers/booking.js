import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Bus from '../models/Bus.js';

export const createBooking = async (req, res) => {
	const { busId, seat, from, to, tripTime, date } = req.body;

	try {
		const userId = req.user._id; // Get user ID from the request (authenticated user)
		const user = await User.findById(userId);
		const admin = await User.findOne({ role: 'ADMIN' });
		console.log('tripTime', tripTime);
		// Find the bus
		const bus = await Bus.findById(busId);
		if (!bus) {
			return res.status(404).json({ message: 'Bus not found' });
		}

		// Check if the bus is fully booked
		if (bus.seatsFilled >= bus.seatCapacity) {
			return res
				.status(400)
				.json({ message: 'Bus is fully booked, no available seats.' });
		}

		// Calculate available seats
		const availableSeats = bus.seatCapacity - bus.seatsFilled;
		if (availableSeats < seat) {
			return res.status(400).json({
				message: `Only ${availableSeats} seat(s) available, but ${seat} seat(s) requested.`,
			});
		}

		// Define a constant price for the booking per seat (you can adjust this as needed)
		const pricePerSeat = bus.price;
		const totalPrice = pricePerSeat * seat;

		// Check if the user has sufficient wallet balance
		if (user.wallet < totalPrice) {
			return res.status(400).json({
				message:
					'Insufficient funds, please fund your account to complete the booking.',
			});
		}

		// Deduct the amount from user's wallet
		user.wallet -= totalPrice;
		admin.wallet += totalPrice;
		// Create the booking
		const booking = await Booking.create({
			tripTime,
			userId,
			busId,
			from,
			to,
			date,
			price: totalPrice,
			seat,
			status: 'CONFIRMED', // Set status to CONFIRMED upon successful booking
		});
		bus.seatsFilled += seat;
		await bus.save();
		await user.save();
		await admin.save();

		// Return success response
		res.status(201).json({ message: 'Booking successful', booking });
	} catch (error) {
		console.log(error);
		// Handle errors
		res.status(400).json({ error: error.message });
	}
};

export const getbookings = async (req, res) => {
	try {
		const userId = req.user._id;
		let result;
		if (req.user.role === 'ADMIN') {
			result = await Booking.find();
		} else {
			result = await Booking.find({ userId }).populate('busId');
		}
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const getbooking = async (req, res) => {
	try {
		const { id } = req.params;

		console.log('booking req.params.id', req.params.id);
		const booking = await Booking.findById(id).populate('busId').populate({
			path: 'userId',
			select: 'email name phone rank',
		});

		if (!booking) {
			return res.status(404).json({ message: 'Booking not found' });
		}
		res.status(201).json(booking);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const updateBookingStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		const result = await Booking.findByIdAndUpdte(id, { status }).populate(
			'userId'
		);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
