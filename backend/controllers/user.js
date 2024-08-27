import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Report from '../models/Report.js';
import Trip from '../models/Trip.js';
import Bus from '../models/Bus.js';
import Booking from '../models/Booking.js';
import { createToken, createRefreshToken } from './../utils/tokens.js';

export const registerUser = async (req, res) => {
	const { name, email, phone, password, rank, regId, role = 'USER' } = req.body;
	try {
		const existingEmail = await User.findOne({ email });

		// To handle the 409 status code, typically indicating a conflict, you might want to implement it in scenarios where there's a conflict with the current state of the resource.
		// For example, if you're trying to create a new user with an email or username that already exists, it would result in a conflict.

		if (existingEmail) {
			return res.status(409).json({ error: 'Email address already exists' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			name,
			email,
			phone,
			rank,
			role,
			regId,
			password: hashedPassword,
		});
		await user.save();
		res
			.status(201)
			.json({ message: 'User registered successfully, Login to continue' });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const newUser = await User.findOne({ email }).select('-password');
		const accessToken = await createToken({ user: newUser });
		const refreshToken = await createRefreshToken({ _id: user._id });
		res.status(200).json({ user: newUser, accessToken, refreshToken });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export const loginAdmin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		if (user.role !== 'ADMIN') {
			return res.status(401).json({ message: 'Unauthorized request' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const newUser = await User.findOne({ email }).select('-password');
		const accessToken = await createToken({ user: newUser });
		const refreshToken = await createRefreshToken({ _id: user._id });
		res.status(200).json({ user: newUser, accessToken, refreshToken });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
export const refreshToken = async (req, res) => {
	const { refreshToken } = req.body;
	try {
		if (!refreshToken) {
			return res.status(401).json({ message: 'Unauthorized request' });
		}
		const decodedToken = jwt.verify(
			refreshToken,
			process.env.JWT_REFRESH_SECRET
		);
		const user = await User.findById(decodedToken?._id).select('-password');
		if (!user) {
			return res.status(401).json({ message: 'Invalid refresh token' });
		}
		const accessToken = await createToken({ user });
		const newRefreshToken = await createRefreshToken({ _id: user._id });
		res.status(200).json({ accessToken, refreshToken: newRefreshToken });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const getUserDashboard = async (req, res) => {
	try {
		const userId = req.user._id;
		const reports = await Report.find({ userId });
		// get current date and get 5 trips closer to the date
		const currentDate = new Date();

		const trips = await Trip.find({
			date: {
				$gte: currentDate,
			},
		})
			.sort({
				date: 1,
			})
			.limit(5);
		let result;
		if (req.user.role === 'ADMIN') {
			result = await Booking.find().limit(10);
		} else {
			result = await Booking.find({ userId });
		}
		const data = { user: req.user, reports, bookings: result, trips };
		// Send the response
		res.json(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
};
export const getAdminDashboard = async (req, res) => {
	try {
		const totalreports = await Report.countDocuments();
		const totalusers = await User.countDocuments();
		const totaltrips = await Trip.countDocuments();
		const totalbuses = await Bus.countDocuments();
		const totalbookings = await Booking.countDocuments();
		const reports = await Report.find().limit(10);
		const users = await User.find().limit(10);
		const trips = await Trip.find().limit(10);
		const buses = await Bus.find().limit(10);
		// Define a custom sort order for statuses
		const sortOrder = { pending: 1, confirmed: 2, conpleted: 3, canceled: 4 };

		// Fetch and sort bookings, prioritizing 'pending' status
		const bookings = await Booking.aggregate([
			{
				$addFields: {
					sortOrder: {
						$switch: {
							branches: [
								{
									case: { $eq: ['$status', 'PENDING'] },
									then: sortOrder.pending,
								},
								{
									case: { $eq: ['$status', 'CONFIRMED'] },
									then: sortOrder.c,
								},
								{
									case: { $eq: ['$status', 'COMPLETED'] },
									then: sortOrder.conpleted,
								},
								{
									case: { $eq: ['$status', 'CANCELLED'] },
									then: sortOrder.canceled,
								},
							],
							default: 4, // Any other statuses will have lowest priority
						},
					},
				},
			},
			{ $sort: { sortOrder: 1 } },
			{ $limit: 10 }, // Limit the results to 10
			{ $project: { sortOrder: 0 } }, // Remove the sortOrder field from the final output
		]);
		const data = {
			totalusers,
			users,
			totalreports,
			reports,
			totalbookings,
			bookings,
			totalbuses,
			buses,
			totaltrips,
			trips,
		};
		// Send the response
		res.json(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
};
